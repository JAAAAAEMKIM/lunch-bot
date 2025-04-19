import { MealRepository } from '@/application/repository/MealRepository';
declare class CrawlService {
    private mealRepository;
    constructor(mealRepository: MealRepository);
    saveWeeklyMeals(path: string): Promise<void>;
}
export default CrawlService;
