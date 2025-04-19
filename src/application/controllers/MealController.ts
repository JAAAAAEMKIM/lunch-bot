import { SendDailyMealService } from '@/application/services/SendDailyMealService';

/**
 * 식단 메시지 전송 컨트롤러
 */
export class MealController {
  constructor(private sendDailyMealService: SendDailyMealService) {}

  /**
   * 일일 식단 메시지를 전송합니다.
   * @param isDev 개발 모드 여부
   * @param isDinner 저녁 메뉴 여부
   * @param channelNumber 채널 번호 (1 또는 2)
   */
  async sendDailyMealMessage(
    isDev: boolean = false,
    isDinner: boolean = false,
    channelNumber: 1 | 2 = 1
  ): Promise<void> {
    try {
      await this.sendDailyMealService.sendDailyMeal({
        isDev,
        isMealDinner: isDinner,
        channelNumber,
      });
    } catch (error) {
      console.error('식단 메시지 전송 중 오류가 발생했습니다:', error);
      throw error;
    }
  }
}
