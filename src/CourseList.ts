import { MEAL } from "@/MealData";
import { Attachment } from "@/Attachment";

type Menu = string;

export type Course = {
  label: string;
  menus: Menu[];
  calories?: number;
  concept?: string;
};

class CourseList {
  list: Course[];

  constructor(list: Course[]) {
    this.list = list;
  }

  toAttachments(isLunch: boolean): Attachment[] {
    const date = new Date();
    const month = date.getMonth() + 1;
    const dateNumber = date.getDate();
    const title = isLunch ? "오늘의 점심 메뉴" : "오늘의 저녁 메뉴";

    const courses = this.list.map((course) => ({
      title: course.calories
        ? `${course.label} - ${course.calories} kcal`
        : course.label,
      text: course.menus.join("\n"),
    }));
    return [{ title: `${month}/${dateNumber} - ${title}` }, ...courses];
  }
}

export default CourseList;
