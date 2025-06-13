import { CourseDisplayData, MenuInfoDto } from '@/domain/types';
import { COURSE_TYPE } from '@/domain/constants';
import MenuInfo from './MenuInfo';

/**
 * 코스 정보를 표현하는 도메인 모델
 */
class Course {
  private menus: MenuInfo[];
  private imageUrl?: string;

  constructor(private label: string, menus: MenuInfoDto[]) {
    this.menus = menus.map(
      (dto) => new MenuInfo(dto.name, dto.calory, dto.protein)
    );
  }

  private get type() {
    switch (this.label) {
      case '도시락':
        return COURSE_TYPE.LUNCHBOX;
      case 'PLUS':
        return COURSE_TYPE.PLUS;
      default:
        return COURSE_TYPE.STANDARD;
    }
  }

  private get title(): string {
    return this.label.replace('\r\n', ' ');
  }

  get mainMenu() {
    return this.menus[0]?.name ?? '';
  }

  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  hasMenus(): boolean {
    return this.menus.length > 0;
  }

  toDisplayData(): CourseDisplayData {
    return {
      title: this.title,
      menus: this.menus.map((menu) => menu.toDisplayDto()),
      type: this.type,
      imageUrl: this.imageUrl,
    };
  }
}

export default Course;
