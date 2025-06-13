import { CourseDisplayData } from '@/domain/types';
export type AttachmentDto = {
    title: string;
    text?: string;
    image?: string;
};
export declare const convertCourseToAttachment: ({ title, menus, type, imageUrl, }: CourseDisplayData) => AttachmentDto;
