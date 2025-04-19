import { CourseListDisplayData } from '@/domain/types';
import Course from './Course';

class CourseList {
  constructor(private courses: Course[]) {}

  private getTitle(isLunch: boolean) {
    const date = new Date();
    const month = date.getMonth() + 1;
    const dateNumber = date.getDate();
    return `${month}/${dateNumber} - ${
      isLunch ? '오늘의 점심 메뉴' : '오늘의 저녁 메뉴'
    }`;
  }

  toDisplayData(isLunch: boolean): CourseListDisplayData {
    const courses = this.courses
      .filter((course) => course.hasMenus())
      .map((course) => course.toDisplayData());

    return { title: this.getTitle(isLunch), courses };
  }
}

export default CourseList;
