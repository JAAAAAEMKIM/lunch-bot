import XLSX, { Sheet, WorkBook, WorkSheet, readFile } from "xlsx";

import { Course } from "@/CourseList";
import { CATEGORY_IDX, COLUMN_COUNT, RATIO_IDX } from "@/constants";

function getExcelColumnLabel(index: number) {
  let label = "";
  while (index > 0) {
    let remainder = (index - 1) % 26;
    label = String.fromCharCode(65 + remainder) + label;
    index = Math.floor((index - 1) / 26);
  }
  return label;
}

class XlsxFile {
  workbook: WorkBook;

  constructor(path: string) {
    this.workbook = readFile(path);
  }

  private readDataByIndex(
    data: Array<Array<string | number | undefined>>,
    rowStart: number,
    rowEnd: number,
    columnStart: number,
    rawSheet: Sheet,
  ): Course[] {
    const courses = [];

    let curCourse: Course | null = null;
    for (let row = rowStart; row < rowEnd; row++) {
      const label = String(data[row][2] || "");
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
      // const ratioCellIdx = [
      //   getExcelColumnLabel(columnStart + RATIO_IDX + 1),
      //   row + 1,
      // ].join("");
      // if (rawSheet[ratioCellIdx]?.w) {
      //   menuRow[RATIO_IDX] = rawSheet[ratioCellIdx]?.w;
      // }

      const menu = String(menuRow[0] || "");

      if (curCourse.label === "PLUS") {
        if (!menu) continue;
        if (/(현미밥.*|그린샐러드|드레싱|.*김치)/.test(menu)) continue;

        curCourse.menus.push(menuRow);
        continue;
      } else if (!curCourse.label.includes(`코스`)) {
        curCourse.label = "도시락";
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
    const data = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, {
      header: 1,
    });
    const categories = data.map((row) => row[CATEGORY_IDX]);
    const lunchIdx = categories.findIndex((x) => x === "중식");
    const dinnerIdx = categories.findIndex((x) => x === "석식");

    const menus = [];

    for (let day = 0; day < 5; day++) {
      if (!lunchIdx || !dinnerIdx) menus.push({ lunch: [], dinner: [] });

      const columnStart = 3 + COLUMN_COUNT * day;

      menus.push({
        lunch: this.readDataByIndex(
          data,
          lunchIdx,
          dinnerIdx,
          columnStart,
          sheet,
        ),
        dinner: this.readDataByIndex(
          data,
          dinnerIdx,
          data.length,
          columnStart,
          sheet,
        ),
      });
    }

    return menus;
  }

  parse() {
    return this.parseSheet(this.readSheet());
  }
}

export default XlsxFile;
