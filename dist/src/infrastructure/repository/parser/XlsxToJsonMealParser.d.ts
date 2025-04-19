import { MealParser } from '@/infrastructure/repository/parser/MealParser';
import { WeeklyDataDto } from '@/domain/types';
/**
 * Excel 파일에서 식단 데이터를 파싱하는 클래스
 */
declare class XlsxToJsonMealParser implements MealParser {
    private parseMenu;
    private readDataByIndex;
    private readSheet;
    private parseSheet;
    parse(path: string): WeeklyDataDto;
}
export default XlsxToJsonMealParser;
