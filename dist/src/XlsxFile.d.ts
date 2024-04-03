import { WorkBook } from "xlsx";
import { WeeklyData } from "@/MealData";
declare class XlsxFile {
    workbook: WorkBook;
    constructor(path: string);
    private readDataByIndex;
    private readSheet;
    private parseSheet;
    parse(): WeeklyData;
}
export default XlsxFile;
