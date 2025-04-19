/**
 * 애플리케이션의 중앙 진입점 역할을 하는 DI Container 클래스
 * 모든 컨트롤러 인스턴스를 관리하고 유스케이스를 노출합니다.
 */
declare class App {
    private static instance;
    private mealController;
    private crawlController;
    private config;
    private constructor();
    static getInstance(): App;
    setConfig(options: {
        isDev: boolean;
        isLunch: boolean;
        channel: 0 | 1 | 2;
    }): void;
    sendDailyMealMessage(): Promise<void>;
    crawlAndSaveMealData(path: string): Promise<void>;
    /**
     * 테스트에서 사용할 모의 의존성 주입
     */
    setMockDependencies(mockDependencies: Record<string, any>): void;
}
export default App;
