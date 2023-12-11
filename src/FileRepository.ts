import { join } from "path";

import { WorkSheet, readFile, set_fs } from "xlsx";

import * as fs from "fs";
import MealData, { Course, WeeklyData } from "./MealData";

set_fs(fs);
const FILE_NAME = "lunch.xlsx";
const DAY_COLUMNS = ["D", "E", "F", "G", "H"];
const COURSE_REGEX = /코스.*/;
const PLUS_REGEX = /^Plus.*/;
const CONCEPT_REGEX = /\[.*\]/;

const isCourseLabel = (str: string): boolean =>
  COURSE_REGEX.test(str) ||
  PLUS_REGEX.test(str) ||
  str === "샌드위치" ||
  str === "샐러드" ||
  str === "웰핏도시락";

const FileRepository = () => {
  const readXlsx = () => {
    const workbook = readFile(join(import.meta.dir, "..", FILE_NAME));
    const sheet = workbook.Sheets[workbook.SheetNames[1]];
    return sheet;
  };

  const readDataByIndex = (
    sheet: WorkSheet,
    start: number,
    end: number,
    column: string,
  ): Course[] => {
    const courses = [];

    let curCourse: Course | null = null;
    for (; start < end; start++) {
      const courseKey = `C${start}`;

      console.log(sheet[courseKey]);

      if (sheet[courseKey] && isCourseLabel(sheet[courseKey]["v"])) {
        if (curCourse) {
          courses.push(curCourse);
          console.log(curCourse);
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
  };

  const parse = (sheet: WorkSheet) => {
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
        lunch: readDataByIndex(sheet, lunchIdx, dinnerIdx, column),
        dinner: readDataByIndex(sheet, dinnerIdx, lastIdx, column),
      };
    });

    console.log(menus);
    return menus;
  };

  const getData = (): MealData => {
    const sheet = readXlsx();
    return new MealData(parse(sheet));
  };

  return getData();
};

export default FileRepository;
