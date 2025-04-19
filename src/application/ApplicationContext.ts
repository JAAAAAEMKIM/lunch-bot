import { MEAL } from "@/domain/constants";

type ApplicationState = {
  isDev: boolean;
  channel: 1 | 2;
  meal: MEAL;
};

/**
 * 애플리케이션 컨텍스트를 관리하는 싱글톤 클래스
 */
class ApplicationContext {
  private static instance: ApplicationContext | null = null;
  private state: ApplicationState;

  constructor() {
    this.state = {
      isDev: false,
      meal: MEAL.LUNCH,
      channel: 1,
    };
  }

  static getInstance() {
    return ApplicationContext.instance ?? (ApplicationContext.instance = new ApplicationContext());
  }
  
  get meal() {
    return this.state.meal;
  }
  
  get isDev() {
    return this.state.isDev;
  }
  
  get channel() {
    return this.state.channel;
  }

  set(partial: Partial<ApplicationState>) {
    this.state = { ...this.state, ...partial };
  }
}

export default ApplicationContext;