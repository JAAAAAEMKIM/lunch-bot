import { MealController } from '@/application/controllers/MealController';
import { CrawlController } from '@/application/controllers/CrawlController';
import { JsonMealRepository } from '@/infrastructure/repository/JsonMealRepository';
import { DoorayMessageAdapter } from '@/infrastructure/adapters/DoorayMessageAdapter';
import { MealServiceAdapter } from '@/infrastructure/adapters/MealServiceAdapter';
import { SendDailyMealService } from '@/application/services/SendDailyMealService';
import CrawlService from '@/application/services/CrawlService';
import XlsxToJsonMealParser from '@/infrastructure/adapters/XlsxToJsonMealParser';
import ApplicationContext from './application/ApplicationContext';
import { MEAL } from '@/domain/constants';

/**
 * 애플리케이션의 중앙 진입점 역할을 하는 DI Container 클래스
 * 모든 컨트롤러 인스턴스를 관리하고 유스케이스를 노출합니다.
 */
class App {
  private static instance: App | null = null;

  private mealController: MealController;
  private crawlController: CrawlController;

  private constructor() {
    const lunchJsonPath = process.env.DEFAULT_LUNCH_JSON_PATH ?? './lunch.json';
    const mealRepository = new JsonMealRepository(lunchJsonPath);

    const messageService = new DoorayMessageAdapter();
    const mealService = new MealServiceAdapter();
    const mealParser = new XlsxToJsonMealParser();

    const sendDailyMealService = new SendDailyMealService(
      mealRepository,
      messageService,
      mealService
    );
    const crawlService = new CrawlService(mealRepository, mealParser);

    this.mealController = new MealController(sendDailyMealService);
    this.crawlController = new CrawlController(crawlService);
  }

  static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  setContext(options: {
    isDev?: boolean;
    isDinner?: boolean;
    channelNumber?: 1 | 2;
  }): void {
    const context = ApplicationContext.getInstance();
    context.set({
      isDev: options.isDev ?? context.isDev,
      meal: options.isDinner ? MEAL.DINNER : MEAL.LUNCH,
      channel: options.channelNumber ?? context.channel,
    });
  }

  async sendDailyMealMessage(): Promise<void> {
    // 컨텍스트 기반으로 메일 메시지 전송
    await this.mealController.sendDailyMealMessage();
  }

  async crawlAndSaveMealData(): Promise<boolean> {
    return await this.crawlController.processFile();
  }

  // 테스트를 위한 메서드들

  /**
   * 테스트에서 사용할 모의 의존성 주입
   */
  setMockDependencies(mockDependencies: Record<string, any>) {
    // mock 객체로 의존성 교체 로직 (추후 구현)
  }
}

export default App;
