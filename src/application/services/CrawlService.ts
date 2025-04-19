import { MealRepository } from '@/application/repository/MealRepository';

class CrawlService {
  constructor(private mealRepository: MealRepository) {}

  async saveWeeklyMeals(path: string) {
    return this.mealRepository.saveWeeklyMeals(path);
  }
}

export default CrawlService;
