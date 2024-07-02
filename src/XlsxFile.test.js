import XlsxFile from "./XlsxFile";
import path from "path";

describe("XlsxFile", () => {
  it("parses xlsx file to course menus list", () => {
    const xlsxFile = new XlsxFile(
      path.join(__dirname, "./__mocks__/lunch.xlsx"),
    );
    const parsed = xlsxFile.parse();
    expect(parsed[0].lunch[0].label).toEqual("1코스 한식");
    expect(parsed[0].lunch[0].menus[0][0]).toEqual("잡곡밥");
    expect(parsed[0].lunch[0].menus[0][5]).toEqual(337.1);
    expect(parsed[0].dinner[1].label).toEqual("2코스 글로벌");
    expect(parsed[0].dinner[0].menus[0][0]).toEqual("전주비빔밥");
    expect(parsed[0].dinner[0].menus[0][5]).toEqual(411.6);
  });
});
