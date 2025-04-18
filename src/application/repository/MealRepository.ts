import WeeklyData from '@/domain/model/WeeklyData';
import { WeeklyDataDto } from '@/domain/types';

/**
 * 식단 데이터에 대한 접근을 정의하는 리포지토리 인터페이스
 */
export interface MealRepository {
  /**
   * 주간 식단 데이터를 불러옵니다.
   */
  getWeeklyMeals(): Promise<WeeklyData>;

  /**
   * 주간 식단 데이터를 저장합니다.
   * @param data 저장할 주간 식단 데이터
   */
  saveWeeklyMeals(data: WeeklyDataDto): Promise<void>;
}
