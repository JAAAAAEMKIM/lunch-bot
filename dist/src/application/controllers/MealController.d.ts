import { MealRepository } from "@/application/repository/MealRepository";
import { MessageService } from "@/application/ports/MessageService";
import { MealService } from "@/application/ports/MealService";
/**
 * 식단 메시지 전송 컨트롤러
 */
export declare class MealController {
    private sendDailyMealService;
    constructor(mealRepository: MealRepository, messageService: MessageService, mealService: MealService);
    /**
     * 일일 식단 메시지를 전송합니다.
     * @param isDev 개발 모드 여부
     * @param isDinner 저녁 메뉴 여부
     * @param channelNumber 채널 번호 (1 또는 2)
     */
    sendDailyMealMessage(isDev?: boolean, isDinner?: boolean, channelNumber?: 1 | 2): Promise<void>;
}
