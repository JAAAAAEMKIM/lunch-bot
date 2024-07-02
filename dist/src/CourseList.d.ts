import { Attachment } from "@/Attachment";
type MenuInfo = (string | number | null | undefined)[];
export type Course = {
    label: string;
    menus: MenuInfo[];
};
declare class CourseList {
    list: Course[];
    constructor(list: Course[]);
    toAttachments(isLunch: boolean): Attachment[];
}
export default CourseList;
