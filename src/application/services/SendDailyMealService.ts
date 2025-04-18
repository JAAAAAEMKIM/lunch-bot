import { MessageService } from '@/application/ports/MessageService';
import { MealService } from '@/application/ports/MealService';
import { MealRepository } from '@/application/repository/MealRepository';
import { getRandomEmoji } from '@/infrastructure/utils/emoji';
import { MEAL } from '@/domain/constants';

/**
 * 일간 식단 메시지 전송을 위한 서비스
 */
export class SendDailyMealService {
  constructor(
    private mealRepository: MealRepository,
    private messageService: MessageService,
    private mealService: MealService
  ) {}

  /**
   * 현재 요일 계산 (0-4: 월-금)
   * @returns 요일 인덱스
   */
  private getToday(): number {
    const date = new Date();
    if (date.getDay() === 0) {
      return 7;
    }
    return date.getDay() - 1;
  }

  /**
   * 식단 메시지 전송 실행
   * @param options 전송 옵션
   */
  async sendDailyMeal(options: {
    isDev: boolean;
    isMealDinner: boolean;
    channelNumber: 1 | 2;
  }): Promise<void> {
    const today = this.getToday();

    if (today > 4) {
      console.log('주말에는 메시지를 전송하지 않습니다.');
      return;
    }

    // 데이터 가져오기
    const weeklyData = await this.mealRepository.getWeeklyMeals();

    // 식단 타입 결정 (점심/저녁)
    const isLunch = !options.isMealDinner;
    const mealType = isLunch ? MEAL.LUNCH : MEAL.DINNER;

    // 오늘의 식단 가져오기
    const todayMeals = weeklyData.at(today);
    const courses =
      mealType === MEAL.LUNCH ? todayMeals.lunch : todayMeals.dinner;

    // 첨부파일 생성
    const attachments = this.mealService.formatCoursesToAttachments(
      courses,
      isLunch
    );
    const text = getRandomEmoji(5);

    // 채널 타입 결정
    let channelType = 'FE';
    if (options.isDev) {
      channelType = 'TEST';
    } else if (options.channelNumber === 2) {
      channelType = 'GROUP';
    }

    // 메시지 전송
    await this.messageService.sendMessage(channelType, attachments, text);

    console.log('메시지 전송이 완료되었습니다.');
  }
}
