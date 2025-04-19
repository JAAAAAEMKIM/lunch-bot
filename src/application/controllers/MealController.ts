import { SendDailyMealService } from '@/application/services/SendDailyMealService';

/**
 * 식단 메시지 전송 컨트롤러
 */
export class MealController {
  constructor(private sendDailyMealService: SendDailyMealService) {}

  async sendDailyMealMessage(isLunch: boolean): Promise<void> {
    try {
      return await this.sendDailyMealService.sendDailyMeal(isLunch);
    } catch (error) {
      throw new Error(`식단 메시지 전송 중 오류가 발생했습니다., ${error}`);
    }
  }
}
