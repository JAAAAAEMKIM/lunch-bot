import { MealRepository } from '@/application/repository/MealRepository';
import { MealParser } from '@/application/ports/MealParser';
import { CrawlService } from '@/application/ports/CrawlService';

export class CrawlServiceAdapter implements CrawlService {
  constructor(
    private mealRepository: MealRepository,
    private parser: MealParser
  ) {}

  async saveWeeklyMeals(): Promise<boolean> {
    try {
      const data = this.parser.parse();
      await this.mealRepository.saveWeeklyMeals(data);
      return true;
    } catch (error) {
      console.error('식단 데이터를 저장하는 중 오류가 발생했습니다:', error);
      return false;
    }
  }
}
