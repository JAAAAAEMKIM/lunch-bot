import { Course } from "./CourseList";

export const MEAL = {
  DINNER: "dinner",
  LUNCH: "lunch",
} as const;
export type MEAL = (typeof MEAL)[keyof typeof MEAL];

type MealPlan = {
  lunch: Course[];
  dinner: Course[];
};

export type WeeklyData = {
  [key: number]: MealPlan;
};

class MealData {
  data: WeeklyData;
  constructor(data: WeeklyData) {
    this.data = data;
  }
  getByDay(dayIdx: number) {
    return this.data[dayIdx];
  }
}

export default MealData;
