import { AttachmentDto } from '@/domain/types';
import Course from './Course';
import { MenuIndices } from './MenuInfo';

class CourseList {
  constructor(private courses: Course[], indices: MenuIndices) {}

  toAttachments(isLunch: boolean): AttachmentDto[] {
    const date = new Date();
    const month = date.getMonth() + 1;
    const dateNumber = date.getDate();
    const title = isLunch ? '오늘의 점심 메뉴' : '오늘의 저녁 메뉴';

    // 메뉴가 있는 코스만 필터링하고 Attachment로 변환
    const courseAttachments = this.courses
      .filter((course) => course.hasMenus())
      .map((course) => course.toAttachment());

    // 제목 Attachment와 코스 Attachment 배열 합치기
    return [
      { title: `${month}/${dateNumber} - ${title}` },
      ...courseAttachments,
    ];
  }
}

export default CourseList;
