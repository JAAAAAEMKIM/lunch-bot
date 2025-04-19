import { MealParser } from '@/infrastructure/repository/parser/MealParser';
import { MealRepository } from '@/application/repository/MealRepository';
import WeeklyData from '@/domain/model/WeeklyData';
export declare class JsonMealRepository implements MealRepository {
    private jsonFilePath;
    private parser;
    constructor(jsonFilePath: string, parser: MealParser);
    /**
     * JSON 파일에서 주간 식단 데이터를 불러옵니다.
     */
    getWeeklyMeals(): Promise<WeeklyData>;
    /**
     * 주간 식단 데이터를 JSON 파일로 저장합니다.
     * @param data 저장할 주간 식단 데이터
     */
    saveWeeklyMeals(path: string): Promise<void>;
}
