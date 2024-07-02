import XLSX, { WorkBook, WorkSheet, readFile } from "xlsx";

import { Course } from "@/CourseList";
import { COURSE_REGEX, PLUS_REGEX, COLUMN_COUNT } from "@/constants";

const isCourseLabel = (str: string): boolean =>
  COURSE_REGEX.test(str) ||
  PLUS_REGEX.test(str) ||
  str === "샌드위치" ||
  str === "샐러드" ||
  str === "웰핏도시락";

class XlsxFile {
  workbook: WorkBook;

  constructor(path: string) {
    this.workbook = readFile(path);
  }

  private readDataByIndex(
    data: Array<Array<string | undefined>>,
    rowStart: number,
    rowEnd: number,
    columnStart: number,
  ): Course[] {
    const courses = [];

    let curCourse: Course | null = null;
    for (let row = rowStart; row < rowEnd; row++) {
      const label = data[row][1];
      if (label) {
        if (curCourse && curCourse.menus.length > 0) {
          courses.push(curCourse);
        }
        curCourse = {
          label: label.replace(/\r\n/, " "),
          menus: [],
        };
      }

      if (!curCourse) {
        continue;
      }
      const menuRow = data[row].slice(columnStart, columnStart + COLUMN_COUNT);
      const menu = menuRow[0];

      if (curCourse.label === "PLUS") {
        if (!menu) continue;
        if (/(현미밥.*|그린샐러드|드레싱|.*김치)/.test(menu)) continue;

        curCourse.menus.push(menuRow);
        continue;
      }
      if (curCourse.label === "도시락") {
        menu && curCourse.menus.push(menuRow);
        continue;
      }
      if (menu) {
        curCourse.menus.push(menuRow);
      }
    }
    if (curCourse && curCourse.menus.length) {
      courses.push(curCourse);
    }
    return courses.filter(Boolean);
  }

  private readSheet() {
    return this.workbook.Sheets[this.workbook.SheetNames[0]];
  }

  private parseSheet(sheet: WorkSheet) {
    const data = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 });
    const categories = data.map((row) => row[0]);
    const lunchIdx = categories.findIndex((x) => x === "중식");
    const dinnerIdx = categories.findIndex((x) => x === "석식");

    const menus = [];

    for (let day = 0; day < 5; day++) {
      if (!lunchIdx || !dinnerIdx) menus.push({ lunch: [], dinner: [] });
      const columnStart = 2 + COLUMN_COUNT * day;

      menus.push({
        lunch: this.readDataByIndex(data, lunchIdx, dinnerIdx, columnStart),
        dinner: this.readDataByIndex(data, dinnerIdx, data.length, columnStart),
      });
    }

    return menus;
  }

  parse() {
    return this.parseSheet(this.readSheet());
  }
}

export default XlsxFile;
