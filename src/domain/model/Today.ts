/**
 * 현재 요일 계산 (0-4: 월-금)
 */
class Today {
  index: number;

  constructor() {
    const date = new Date();
    if (date.getDay() === 0) {
      this.index = 7;
    }
    this.index = date.getDay() - 1;
  }

  isWeekend() {
    return this.index > 4;
  }
}

export default Today;
