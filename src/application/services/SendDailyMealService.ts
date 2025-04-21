import { MessageService } from '@/application/ports/MessageService';
import { MealRepository } from '@/application/repository/MealRepository';
import { getRandomEmoji } from '@/application/utils/emoji';
import CourseList from '@/domain/model/CourseList';
import Today from '@/domain/model/Today';

/**
 * 일간 식단 메시지 전송을 위한 서비스
 */
export class SendDailyMealService {
  constructor(
    private mealRepository: MealRepository,
    private messageService: MessageService
  ) {}

  async sendDailyMeal(isLunch: boolean): Promise<void> {
    const today = new Today();

    if (today.isWeekend()) {
      console.log('주말에는 메시지를 전송하지 않습니다.');
      return;
    }

    const weeklyData = await this.mealRepository.getWeeklyMeals();

    // 오늘의 식단 가져오기
    const todayMeals = weeklyData.at(today.index);
    const courses = isLunch ? todayMeals.lunch : todayMeals.dinner;

    // 첨부파일 생성
    const courseList = new CourseList(courses);
    const contents = courseList.toDisplayData(isLunch);
    const title = getRandomEmoji(5);

    // 메시지 전송
    await this.messageService.sendMessage(title, contents);
  }
}
