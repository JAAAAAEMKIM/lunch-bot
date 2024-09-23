import { Attachment } from "@/Attachment";
import { CALORY_IDX, PROTEIN_IDX, RATIO_IDX } from "@/constants";

type MenuInfo = (string | number | null | undefined)[];

export type Course = {
  label: string;
  menus: MenuInfo[];
};

const getProteinFrom = (
  ratio: string | number | null | undefined,
  calory: string | number | null | undefined,
) => {
  if (!ratio || !calory || typeof ratio === "number") return 0;
  const [carb, protein, fat] = ratio.split(":").map(Number);
  if (!carb || !protein || !fat) return 0;

  return (Number(calory) * protein) / (carb * 4 + protein * 4 + fat * 9);
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
                  `${String(menu[0] || "").replace("\r\n", " ")}\n${menu[CALORY_IDX]} kcal / ${Number(menu[PROTEIN_IDX]).toFixed(2)}g`,
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
          return {
            title: course.label.replace("\r\n", " "),
            text: `${menus.map((menu) => String(menu[0] || "")?.replace("\r\n", " ")).join("\n")}`,
          };
        }
        const menu = course.menus[0];
        const calories = Number(menu[CALORY_IDX]) || 0;
        const protein = Number(menu[PROTEIN_IDX]) || 0;

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
