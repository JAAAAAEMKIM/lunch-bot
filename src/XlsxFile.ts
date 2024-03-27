import { WorkBook, WorkSheet, readFile, set_fs } from "xlsx";

import * as fs from "fs";
import { WeeklyData } from "./MealData";
import { Course } from "./CourseList";
import {
  CONCEPT_REGEX,
  COURSE_REGEX,
  PLUS_REGEX,
  DAY_COLUMNS,
} from "@/constants";

set_fs(fs);

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
    sheet: WorkSheet,
    start: number,
    end: number,
    column: string,
  ): Course[] {
    const courses = [];

    let curCourse: Course | null = null;
    for (; start < end; start++) {
      const courseKey = `C${start}`;

      if (sheet[courseKey] && isCourseLabel(sheet[courseKey]["v"])) {
        if (curCourse) {
          courses.push(curCourse);
        }
        curCourse = { label: sheet[courseKey]["v"], menus: [] };
      }

      if (!curCourse) {
        start += 1;
        continue;
      }
      const dataKey = `${column}${start}`;
      if (sheet[dataKey]) {
        const data = sheet[dataKey]["v"];
        if (typeof data === "number") {
          curCourse.calories = data;
        } else if (CONCEPT_REGEX.exec(data)) {
          curCourse.concept = data;
        } else {
          curCourse.menus.push(data);
        }
      }
    }
    if (curCourse) {
      courses.push(curCourse);
    }
    return courses.filter(Boolean);
  }

  private readSheet() {
    return this.workbook.Sheets[this.workbook.SheetNames[1]];
  }

  private parseSheet(sheet: WorkSheet) {
    const rows = Object.keys(sheet)
      .map((key) => Number(key.substring(1)))
      .filter((x) => !isNaN(x));

    const categories = Object.keys(sheet).filter((key) => key.startsWith("B"));

    const lastIdx = rows[rows.length - 1];
    const lunchIdx = Number(
      categories.find((c) => sheet[c]?.v === "점심")?.substring(1),
    );
    const dinnerIdx = Number(
      categories.find((c) => sheet[c]?.v === "저녁")?.substring(1),
    );

    const menus: WeeklyData = DAY_COLUMNS.map((column) => {
      if (!lunchIdx || !dinnerIdx) return { lunch: [], dinner: [] };

      return {
        lunch: this.readDataByIndex(sheet, lunchIdx, dinnerIdx, column),
        dinner: this.readDataByIndex(sheet, dinnerIdx, lastIdx, column),
      };
    });

    return menus;
  }

  parse() {
    return this.parseSheet(this.readSheet());
  }
}

export default XlsxFile;
