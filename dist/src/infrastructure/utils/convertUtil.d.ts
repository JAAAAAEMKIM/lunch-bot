import { CourseDisplayData } from '@/domain/types';
export type AttachmentDto = {
    title: string;
    text?: string;
    imageurl?: string;
};
export declare const convertCourseToAttachment: ({ title, menus, type, }: CourseDisplayData) => AttachmentDto;
