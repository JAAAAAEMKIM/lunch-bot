import { CourseListDisplayData } from '@/domain/types';
import Course from './Course';
declare class CourseList {
    private courses;
    constructor(courses: Course[]);
    private getTitle;
    toDisplayData(isLunch: boolean): CourseListDisplayData;
}
export default CourseList;
