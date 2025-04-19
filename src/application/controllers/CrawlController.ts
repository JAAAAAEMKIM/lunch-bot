import CrawlService from '@/application/services/CrawlService';

/**
 * 크롤링된 데이터를 처리하는 컨트롤러
 * 외부 세계에서 애플리케이션으로 진입하는 지점
 */
export class CrawlController {
  constructor(private crawlService: CrawlService) {}

  async processFile(path: string) {
    try {
      return await this.crawlService.saveWeeklyMeals(path);
    } catch (error) {
      throw new Error(`파일 저장 중 오류가 발생했습니다., ${error}`);
    }
  }
}
