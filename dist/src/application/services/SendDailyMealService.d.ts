import { MessageService } from '@/application/ports/MessageService';
import { ImageRepository } from '@/application/repository/ImageRepository';
import { MealRepository } from '@/application/repository/MealRepository';
/**
 * 일간 식단 메시지 전송을 위한 서비스
 */
export declare class SendDailyMealService {
    private mealRepository;
    private imageRepository;
    private messageService;
    constructor(mealRepository: MealRepository, imageRepository: ImageRepository, messageService: MessageService);
    sendDailyMeal(isLunch: boolean): Promise<void>;
}
