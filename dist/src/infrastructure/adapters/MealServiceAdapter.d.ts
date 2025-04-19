import { MealService } from '@/application/ports/MealService';
import { AttachmentDto } from '@/domain/types';
import Course from '@/domain/model/Course';
/**
 * MealService 인터페이스의 어댑터 구현체
 */
export declare class MealServiceAdapter implements MealService {
    /**
     * 코스 목록을 Dooray 메시지 형식의 Attachment 배열로 변환합니다.
     * @param courses 코스 목록
     * @param isLunch 점심 여부
     * @returns Attachment 배열
     */
    formatCoursesToAttachments(courses: Course[], isLunch: boolean): AttachmentDto[];
}
