import { AttachmentDto } from '@/domain/types';
import Course from './Course';
import { MenuIndices } from './MenuInfo';
declare class CourseList {
    private courses;
    constructor(courses: Course[], indices: MenuIndices);
    toAttachments(isLunch: boolean): AttachmentDto[];
}
export default CourseList;
