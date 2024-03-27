import { MEAL } from "@/MealData";

type _State = {
  isDev: boolean;
  channel: 1 | 2;
  meal: MEAL;
};

class State {
  private static instance: State | null = null;
  private state: _State;

  constructor() {
    this.state = {
      isDev: false,
      meal: MEAL.LUNCH,
      channel: 1,
    };
  }

  static getInstance() {
    return State.instance ?? (State.instance = new State());
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

  set(partial: Partial<_State>) {
    this.state = { ...this.state, ...partial };
  }
}

export default State;
