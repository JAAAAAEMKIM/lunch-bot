import { MealController } from '@/application/controllers/MealController';
import { CrawlController } from '@/application/controllers/CrawlController';
import { JsonMealRepository } from '@/infrastructure/repository/JsonMealRepository';
import { DoorayMessageAdapter } from '@/infrastructure/adapters/DoorayMessageAdapter';
import { SendDailyMealService } from '@/application/services/SendDailyMealService';
import CrawlService from '@/application/services/CrawlService';
import XlsxToJsonMealParser from '@/infrastructure/repository/parser/XlsxToJsonMealParser';
import Config from '@/infrastructure/Config';

/**
 * 애플리케이션의 중앙 진입점 역할을 하는 DI Container 클래스
 * 모든 컨트롤러 인스턴스를 관리하고 유스케이스를 노출합니다.
 */
class App {
  private static instance: App | null = null;

  private mealController: MealController;
  private crawlController: CrawlController;
  private config: Config;

  private constructor() {
    const lunchJsonPath = process.env.DEFAULT_LUNCH_JSON_PATH ?? './lunch.json';

    const mealParser = new XlsxToJsonMealParser();
    const mealRepository = new JsonMealRepository(lunchJsonPath, mealParser);

    const messageService = new DoorayMessageAdapter();

    const sendDailyMealService = new SendDailyMealService(
      mealRepository,
      messageService
    );
    const crawlService = new CrawlService(mealRepository);

    this.mealController = new MealController(sendDailyMealService);
    this.crawlController = new CrawlController(crawlService);
    this.config = Config.getInstance();
  }

  static getInstance(): App {
    if (!App.instance) {
      App.instance = new App();
    }
    return App.instance;
  }

  setConfig(options: {
    isDev: boolean;
    isLunch: boolean;
    channel: 0 | 1 | 2;
  }): void {
    this.config.isDev = options.isDev;
    this.config.isLunch = options.isLunch;
    this.config.channel = options.channel;
  }

  async sendDailyMealMessage(): Promise<void> {
    await this.mealController.sendDailyMealMessage(this.config.isLunch);
  }

  async crawlAndSaveMealData(path: string) {
    return this.crawlController.processFile(path);
  }

  /**
   * 테스트에서 사용할 모의 의존성 주입
   */
  setMockDependencies(mockDependencies: Record<string, any>) {
    // mock 객체로 의존성 교체 로직 (추후 구현)
  }
}

export default App;
