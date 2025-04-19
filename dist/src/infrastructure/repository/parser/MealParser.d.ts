import { WeeklyDataDto } from '@/domain/types';
export interface MealParser {
    /**
     * 데이터 소스를 파싱하여 주간 식단 데이터로 변환합니다.
     * @returns 파싱된 주간 식단 데이터
     */
    parse(path: string): WeeklyDataDto;
}
