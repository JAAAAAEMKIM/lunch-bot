import { CourseDisplayData, MenuInfoDto } from '@/domain/types';
/**
 * 코스 정보를 표현하는 도메인 모델
 */
declare class Course {
    private label;
    private menus;
    constructor(label: string, menus: MenuInfoDto[]);
    private get type();
    private get title();
    hasMenus(): boolean;
    toDisplayData(): CourseDisplayData;
}
export default Course;
