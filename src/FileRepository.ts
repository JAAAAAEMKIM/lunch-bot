import { join } from "path";

import { WorkSheet, readFile, set_fs } from "xlsx";

import * as fs from "fs";
import MealData from "./MealData";

set_fs(fs);
const FILE_NAME = "lunch.xlsx";
const DAY_COLUMNS = ["D", "E", "F", "G", "H"];

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
  ): string[] => {
    const menus = [];
    let dataKey = `${column}${start}`;
    while (start < end) {
      if (sheet[dataKey]) {
        const data = sheet[dataKey]["v"];
        if (typeof data === "number") {
          menus.push(`${data} kcal\n`);
        } else {
          menus.push(data);
        }
      }
      start += 1;
      dataKey = `${column}${start}`;
    }
    return menus.filter(Boolean);
  };
  const parse = (sheet: WorkSheet) => {
    const rows = Object.keys(sheet)
      .map((key) => Number(key.substring(1)))
      .filter((x) => !isNaN(x));

    const categories = Object.keys(sheet).filter((key) => key.startsWith("B"));
    const lunchIdx = Number(
      categories.find((c) => sheet[c]?.v === "점심")?.substring(1),
    );
    const dinnerIdx = Number(
      categories.find((c) => sheet[c]?.v === "저녁")?.substring(1),
    );

    const menus: [string[], string[]][] = DAY_COLUMNS.map((column) => {
      if (!lunchIdx || !dinnerIdx) return [[], []];

      return [
        readDataByIndex(sheet, lunchIdx, dinnerIdx, column),
        readDataByIndex(sheet, dinnerIdx, rows[rows.length - 1], column),
      ];
    });

    return menus;
  };

  const getData = (): MealData => {
    const sheet = readXlsx();
    return new MealData(parse(sheet));
  };

  return getData();
};

export default FileRepository;
