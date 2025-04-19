import Course from "@/domain/model/Course";
import { MenuIndices } from "@/domain/model/MenuInfo";
import { WeeklyDataDto } from "@/domain/types";

class WeeklyData {
  constructor(private dto: WeeklyDataDto, private indices: MenuIndices) {}

  at(index: number) {
    return {
      lunch: this.dto[index].lunch
        .map(courseDto => new Course(courseDto.label, courseDto.menus, this.indices)),
      dinner: this.dto[index].dinner
        .map(courseDto => new Course(courseDto.label, courseDto.menus,  this.indices))
    };
  }
}
export default WeeklyData;