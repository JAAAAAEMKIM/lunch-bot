import { MealParser } from '@/application/ports/MealParser';
import { WeeklyDataDto } from '@/domain/types';
/**
 * Excel 파일에서 식단 데이터를 파싱하는 클래스
 */
declare class XlsxToJsonMealParser implements MealParser {
    private workbook;
    constructor(path?: string);
    setSourcePath(path: string): void;
    private readDataByIndex;
    private readSheet;
    private parseSheet;
    parse(): WeeklyDataDto;
}
export default XlsxToJsonMealParser;
