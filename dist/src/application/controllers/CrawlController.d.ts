import { CrawlService } from '@/application/ports/CrawlService';
/**
 * 크롤링된 데이터를 처리하는 컨트롤러
 * 외부 세계에서 애플리케이션으로 진입하는 지점
 */
export declare class CrawlController {
    private crawlService;
    constructor(crawlService: CrawlService);
    processFile(): Promise<boolean>;
}
