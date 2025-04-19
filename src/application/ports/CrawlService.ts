export interface CrawlService {
  /**
   * 주간 식단 데이터를 저장합니다.
   * @param data 저장할 주간 식단 데이터
   * @returns 저장 성공 여부
   */
  saveWeeklyMeals(): Promise<boolean>;
}
