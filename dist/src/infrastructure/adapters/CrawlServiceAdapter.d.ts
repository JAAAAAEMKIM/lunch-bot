import { MealRepository } from '@/application/repository/MealRepository';
import { MealParser } from '@/application/ports/MealParser';
import { CrawlService } from '@/application/ports/CrawlService';
export declare class CrawlServiceAdapter implements CrawlService {
    private mealRepository;
    private parser;
    constructor(mealRepository: MealRepository, parser: MealParser);
    saveWeeklyMeals(): Promise<boolean>;
}
