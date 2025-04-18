export type AttachmentDto = {
    title: string;
    text?: string;
    imageurl?: string;
};
export type MenuInfoDto = (string | number | null | undefined)[];
export type CourseDto = {
    label: string;
    menus: MenuInfoDto[];
};
export type MealPlanDto = {
    lunch: CourseDto[];
    dinner: CourseDto[];
};
export type WeeklyDataDto = MealPlanDto[];
