import { COURSE_TYPE } from '@/domain/constants';
export type MenuInfoDto = {
    name: string;
    calory?: number;
    protein?: number;
};
export type CourseListDisplayData = {
    title: string;
    courses: CourseDisplayData[];
};
export type MenuDisplayData = {
    name: string;
    calory?: number;
    protein?: number;
};
export type CourseDisplayData = {
    title: string;
    menus: MenuDisplayData[];
    type: COURSE_TYPE;
};
export type CourseDto = {
    label: string;
    menus: MenuInfoDto[];
};
export type MealPlanDto = {
    lunch: CourseDto[];
    dinner: CourseDto[];
};
export type WeeklyDataDto = MealPlanDto[];
