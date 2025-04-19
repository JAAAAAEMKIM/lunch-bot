import Course from '@/domain/model/Course';
import { WeeklyDataDto } from '@/domain/types';

class WeeklyData {
  constructor(private dto: WeeklyDataDto) {}

  at(index: number) {
    return {
      lunch: this.dto[index].lunch.map(
        (courseDto) => new Course(courseDto.label, courseDto.menus)
      ),
      dinner: this.dto[index].dinner.map(
        (courseDto) => new Course(courseDto.label, courseDto.menus)
      ),
    };
  }
}
export default WeeklyData;
