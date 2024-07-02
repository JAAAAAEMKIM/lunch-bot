import { MEAL } from "@/MealData";
type _State = {
    isDev: boolean;
    channel: 1 | 2;
    meal: MEAL;
};
declare class State {
    private static instance;
    private state;
    constructor();
    static getInstance(): State;
    get meal(): MEAL;
    get isDev(): boolean;
    get channel(): 2 | 1;
    set(partial: Partial<_State>): void;
}
export default State;
