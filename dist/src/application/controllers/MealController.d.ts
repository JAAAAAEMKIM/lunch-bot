import { SendDailyMealService } from '@/application/services/SendDailyMealService';
/**
 * 식단 메시지 전송 컨트롤러
 */
export declare class MealController {
    private sendDailyMealService;
    constructor(sendDailyMealService: SendDailyMealService);
    sendDailyMealMessage(isLunch: boolean): Promise<void>;
}
