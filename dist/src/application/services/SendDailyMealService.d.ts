import { MessageService } from '@/application/ports/MessageService';
import { MealService } from '@/application/ports/MealService';
import { MealRepository } from '@/application/repository/MealRepository';
/**
 * 일간 식단 메시지 전송을 위한 서비스
 */
export declare class SendDailyMealService {
    private mealRepository;
    private messageService;
    private mealService;
    constructor(mealRepository: MealRepository, messageService: MessageService, mealService: MealService);
    /**
     * 현재 요일 계산 (0-4: 월-금)
     * @returns 요일 인덱스
     */
    private getToday;
    /**
     * 식단 메시지 전송 실행
     * @param options 전송 옵션
     */
    sendDailyMeal(options: {
        isDev: boolean;
        isMealDinner: boolean;
        channelNumber: 1 | 2;
    }): Promise<void>;
}
