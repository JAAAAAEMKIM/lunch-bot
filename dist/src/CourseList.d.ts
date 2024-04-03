import { Attachment } from "@/Attachment";
type Menu = string;
export type Course = {
    label: string;
    menus: Menu[];
    calories?: number;
    concept?: string;
};
declare class CourseList {
    list: Course[];
    constructor(list: Course[]);
    toAttachments(isLunch: boolean): Attachment[];
}
export default CourseList;
