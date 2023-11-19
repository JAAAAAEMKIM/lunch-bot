type Data = {
  [key: number]: [string[], string[]];
};

class MealData {
  data: Data;
  constructor(data: Data) {
    this.data = data;
  }
  getLunch(dayIdx: number) {
    return this.data[dayIdx][0];
  }

  getDinner(dayIdx: number) {
    return this.data[dayIdx][1];
  }
}

export default MealData;
