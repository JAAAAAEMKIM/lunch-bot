import { MEAL } from "@/domain/constants";
type ApplicationState = {
    isDev: boolean;
    channel: 1 | 2;
    meal: MEAL;
};
/**
 * 애플리케이션 컨텍스트를 관리하는 싱글톤 클래스
 */
declare class ApplicationContext {
    private static instance;
    private state;
    constructor();
    static getInstance(): ApplicationContext;
    get meal(): MEAL;
    get isDev(): boolean;
    get channel(): 1 | 2;
    set(partial: Partial<ApplicationState>): void;
}
export default ApplicationContext;
