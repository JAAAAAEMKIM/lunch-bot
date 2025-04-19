import dotenv from 'dotenv';
import { MealController } from '@/application/controllers/MealController';
import { JsonMealRepository } from '@/infrastructure/repository/JsonMealRepository';
import { DoorayMessageAdapter } from '@/infrastructure/adapters/DoorayMessageAdapter';
import { MealServiceAdapter } from '@/infrastructure/adapters/MealServiceAdapter';

// 환경 변수 로드
dotenv.config();

/**
 * 애플리케이션 시작 함수
 */
const start = async () => {
  try {
    // 명령줄 인자 파싱
    const flags = process.argv.slice(2);
    const isDev = Boolean(flags.find((f) => f === '--dev'));
    const isDinner = Boolean(flags.find((f) => f === '--dinner'));
    const isChannel2 = Boolean(flags.find((f) => f === '--chan2'));

    // 의존성 초기화
    const mealRepository = new JsonMealRepository(
      process.env.DEFAULT_LUNCH_JSON_PATH ?? './lunch.json'
    );
    const messageService = new DoorayMessageAdapter();
    const mealService = new MealServiceAdapter();

    // 컨트롤러 생성 및 실행
    const mealController = new MealController(
      mealRepository,
      messageService,
      mealService
    );

    // 식단 메시지 전송
    await mealController.sendDailyMealMessage(
      isDev,
      isDinner,
      isChannel2 ? 2 : 1
    );

    console.log('식단 전송이 완료되었습니다.');
  } catch (error) {
    console.error('에러가 발생했습니다:', error);
    process.exit(1);
  }
};

// 애플리케이션 시작
start();
