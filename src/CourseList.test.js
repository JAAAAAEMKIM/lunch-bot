import XlsxFile from "./XlsxFile";
import CourseList from "./CourseList";
import path from "path";
describe("CourseList", () => {
  it("parse menus, lunch", () => {
    const xlsxFile = new XlsxFile(
      path.join(__dirname, "./__mocks__/lunch.xlsx"),
    );
    const parsed = xlsxFile.parse();

    const courseList = new CourseList(parsed[0].lunch);

    expect(courseList.toAttachments(true)[0].title).toContain(
      "오늘의 점심 메뉴",
    );

    expect(courseList.toAttachments(true)[1].text).toContain("단백질: 65.30g");
    expect(courseList.toAttachments(true)[2].text).toContain(
      "아몬드크럼블돈까스",
    );
    expect(courseList.toAttachments(true)[3].text).toContain(
      "열량: 745.20 kcal",
    );
    expect(courseList.toAttachments(true)[4].text).not.toContain("단백질");
    expect(courseList.toAttachments(true)[5].text).toContain("kcal");
  });
  it("parse menus, dinner", () => {
    const xlsxFile = new XlsxFile(
      path.join(__dirname, "./__mocks__/lunch.xlsx"),
    );
    const parsed = xlsxFile.parse();

    const courseList = new CourseList(parsed[0].dinner);

    expect(courseList.toAttachments(false)[0].title).toContain(
      "오늘의 저녁 메뉴",
    );

    expect(courseList.toAttachments(false)[1].text).toEqual(`전주비빔밥
약고추장
미역국
땅콩돈육강정
무말랭이간장무침\n
열량: 920.60 kcal
단백질: 38.90g`);
    expect(courseList.toAttachments(false)[2].text).toContain(
      `데리야끼덮밥
토핑_가라아게
미소시루
가쓰오부시순두부
오징어핫바
머스타드\n
열량: 1396.80 kcal
단백질: 61.60g`,
    );
    expect(courseList.toAttachments(false)[3].text).not.toContain("단백질");
  });
});
