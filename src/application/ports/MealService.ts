import Course from '@/domain/model/Course';
import { AttachmentDto } from '@/domain/types.js';

/**
 * 식단 서비스 인터페이스 (출력 포트)
 */
export interface MealService {
  /**
   * 코스 목록을 첨부파일 형식으로 변환합니다.
   * @param courses 코스 목록
   * @param isLunch 점심 여부
   * @returns 첨부파일 배열
   */
  formatCoursesToAttachments(
    courses: Course[],
    isLunch: boolean
  ): AttachmentDto[];
}
