import XLSX, { WorkBook, WorkSheet, readFile } from 'xlsx';

import { MealParser } from '@/application/ports/MealParser';
import {
  CATEGORY_IDX,
  COLUMN_COUNT,
  RATIO_IDX,
} from '@/infrastructure/constants';
import { CourseDto, WeeklyDataDto } from '@/domain/types';

/**
 * Excel 파일에서 식단 데이터를 파싱하는 클래스
 */
class XlsxToJsonMealParser implements MealParser {
  private workbook: WorkBook | null = null;

  constructor(path?: string) {
    if (path) {
      this.setSourcePath(path);
    }
  }

  setSourcePath(path: string): void {
    this.workbook = readFile(path, {
      WTF: true,
      cellHTML: false,
      cellText: false,
    });
  }

  private readDataByIndex(
    data: Array<Array<string | number | undefined>>,
    rowStart: number,
    rowEnd: number,
    columnStart: number
  ): CourseDto[] {
    const courses = [];

    let curCourse: CourseDto | null = null;

    for (let row = rowStart; row < rowEnd; row++) {
      const label = String(data[row][2] || '');
      if (label) {
        if (curCourse && curCourse.menus.length > 0) {
          courses.push(curCourse);
        }
        curCourse = {
          label: label.replace(/\r\n/, ' '),
          menus: [],
        };
      }

      if (!curCourse) {
        continue;
      }
      const menuRow = data[row].slice(columnStart, columnStart + COLUMN_COUNT);

      const menu = String(menuRow[0] || '');

      if (curCourse.label === 'PLUS') {
        if (!menu) continue;
        if (/(현미밥.*|그린샐러드|드레싱|.*김치)/.test(menu)) continue;

        curCourse.menus.push(menuRow);
        continue;
      } else if (!curCourse.label.includes(`코스`)) {
        curCourse.label = '도시락';
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
    if (!this.workbook) {
      throw new Error(
        '워크북이 로드되지 않았습니다. setSourcePath를 먼저 호출하세요.'
      );
    }
    return this.workbook.Sheets['칼로리및알레르기공시'];
  }

  private parseSheet(sheet: WorkSheet): WeeklyDataDto {
    const data = XLSX.utils.sheet_to_json<(string | number)[]>(sheet, {
      header: 1,
    });
    const categories = data.map((row) => row[CATEGORY_IDX]);
    const lunchIdx = categories.findIndex((x) => x === '중식');
    const dinnerIdx = categories.findIndex((x) => x === '석식');

    const menus: WeeklyDataDto = [];

    for (let day = 0; day < 5; day++) {
      if (!lunchIdx || !dinnerIdx) {
        menus[day] = { lunch: [], dinner: [] };
        continue;
      }

      const columnStart = 3 + COLUMN_COUNT * day;

      menus[day] = {
        lunch: this.readDataByIndex(data, lunchIdx, dinnerIdx, columnStart),
        dinner: this.readDataByIndex(data, dinnerIdx, data.length, columnStart),
      };
    }

    return menus;
  }

  parse(): WeeklyDataDto {
    return this.parseSheet(this.readSheet());
  }
}

export default XlsxToJsonMealParser;
