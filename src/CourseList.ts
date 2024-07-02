import { Attachment } from "@/Attachment";

type MenuInfo = (string | number | null | undefined)[];

export type Course = {
  label: string;
  menus: MenuInfo[];
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
    const courses = this.list
      .filter((course) => course.menus.length > 0)
      .map((course) => {
        if (course.label === "도시락") {
          return {
            title: course.label.replace("\r\n", " "),
            text: course.menus
              .map(
                (menu) =>
                  `${String(menu[0] || "").replace("\r\n", " ")}\n(${menu[5]} kcal / ${menu[6]}g)`,
              )
              .join("\n"),
          };
        }
        if (course.label === "PLUS") {
          const menus = course.menus.filter(
            (menu) =>
              !/(.*김치|현미밥.*|그린샐러드|드레싱)/.test(
                String(menu[0] || ""),
              ),
          );
          const calories = menus.reduce(
            (total, menu) => total + Number(menu[5]),
            0,
          );
          const protein = menus.reduce(
            (total, menu) => total + Number(menu[6]),
            0,
          );
          return {
            title: course.label.replace("\r\n", " "),
            text: `${menus.map((menu) => String(menu[0] || "")?.replace("\r\n", " ")).join("\n")}

열량: ${calories.toFixed(2)} kcal`,
          };
        }
        const calories = course.menus.reduce(
          (total, menu) => total + Number(menu[5]),
          0,
        );
        const protein = course.menus.reduce(
          (total, menu) => total + Number(menu[6]),
          0,
        );
        return {
          title: course.label.replace("\r\n", " "),
          text: `${course.menus.map((menu) => String(menu[0] || "")?.replace("\r\n", " ")).join("\n")}

열량: ${calories.toFixed(2)} kcal
단백질: ${protein.toFixed(2)}g`,
        };
      });
    return [{ title: `${month}/${dateNumber} - ${title}` }, ...courses];
  }
}

export default CourseList;
