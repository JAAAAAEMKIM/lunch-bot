import { WorkBook } from "xlsx";
import { Course } from "@/CourseList";
declare class XlsxFile {
    workbook: WorkBook;
    constructor(path: string);
    private readDataByIndex;
    private readSheet;
    private parseSheet;
    parse(): {
        lunch: Course[];
        dinner: Course[];
    }[];
}
export default XlsxFile;
