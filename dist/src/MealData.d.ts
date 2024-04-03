import { Course } from "@/CourseList";
export declare const MEAL: {
    readonly DINNER: "dinner";
    readonly LUNCH: "lunch";
};
export type MEAL = (typeof MEAL)[keyof typeof MEAL];
type MealPlan = {
    lunch: Course[];
    dinner: Course[];
};
export type WeeklyData = {
    [key: number]: MealPlan;
};
declare class MealData {
    data: WeeklyData;
    constructor(data: WeeklyData);
    getByDay(dayIdx: number): MealPlan;
}
export default MealData;
