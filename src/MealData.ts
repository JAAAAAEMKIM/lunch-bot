type MealPlan = {
  lunch: Course[];
  dinner: Course[];
};

export type Course = {
  label: string;
  menus: Menu[];
  calories?: number;
  concept?: string;
};

type Menu = string;

export type WeeklyData = {
  [key: number]: MealPlan;
};

class MealData {
  data: WeeklyData;
  constructor(data: WeeklyData) {
    this.data = data;
  }
  getLunch(dayIdx: number) {
    return this.data[dayIdx].lunch;
  }

  getDinner(dayIdx: number) {
    return this.data[dayIdx].dinner;
  }
}

export default MealData;
