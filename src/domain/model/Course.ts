import { AttachmentDto, MenuInfoDto } from '@/domain/types';
import MenuInfo, { MenuIndices } from './MenuInfo';

/**
 * 코스 정보를 표현하는 도메인 모델
 */
class Course {
  private menus: MenuInfo[];

  constructor(
    private label: string,
    menus: MenuInfoDto[],
    private indices: MenuIndices
  ) {
    this.label = label;
    this.menus = menus.map((dto) => new MenuInfo(dto, indices));
    this.indices = indices;
  }

  /**
   * 원시 메뉴 데이터를 코스에 추가
   * @param rawMenu 원시 메뉴 데이터
   */
  addMenu(rawMenu: (string | number | null | undefined)[]): void {
    this.menus.push(MenuInfo.fromRawData(rawMenu, this.indices));
  }

  /**
   * 코스 라벨 반환
   * @returns 코스 라벨
   */
  getLabel(): string {
    return this.label.replace('\r\n', ' ');
  }

  /**
   * 코스에 메뉴가 있는지 확인
   * @returns 메뉴 존재 여부
   */
  hasMenus(): boolean {
    return this.menus.length > 0;
  }

  /**
   * "도시락" 코스 여부 확인
   * @returns 도시락 코스 여부
   */
  isLunchBox(): boolean {
    return this.label === '도시락';
  }

  /**
   * "PLUS" 코스 여부 확인
   * @returns PLUS 코스 여부
   */
  isPlus(): boolean {
    return this.label === 'PLUS';
  }

  /**
   * 특정 패턴과 일치하지 않는 메뉴만 필터링
   * @param pattern 제외할 패턴
   * @returns 필터링된 메뉴 목록
   */
  getFilteredMenus(pattern: RegExp): MenuInfo[] {
    return this.menus.filter((menu) => !menu.matchesPattern(pattern));
  }

  /**
   * 도시락 코스의 메뉴 텍스트 생성
   * @returns 메뉴 텍스트
   */
  getLunchBoxMenuText(): string {
    return this.menus
      .map(
        (menu) =>
          `${menu.getName()}\n${menu.getCalory()} kcal / ${menu
            .getProtein()
            .toFixed(2)}g`
      )
      .join('\n');
  }

  /**
   * PLUS 코스의 메뉴 텍스트 생성
   * @returns 메뉴 텍스트
   */
  getPlusMenuText(): string {
    const filteredMenus = this.getFilteredMenus(
      /(.*김치|현미밥.*|그린샐러드|드레싱)/
    );
    return filteredMenus.map((menu) => menu.getName()).join('\n');
  }

  /**
   * 일반 코스의 메뉴 텍스트 생성
   * @returns 메뉴 텍스트
   */
  getStandardMenuText(): string {
    const menuNames = this.menus.map((menu) => menu.getName()).join('\n');
    const mainMenu = this.menus[0];

    return `${menuNames}

열량: ${mainMenu.getCalory().toFixed(2)} kcal
단백질: ${mainMenu.getProtein().toFixed(2)}g`;
  }

  /**
   * 코스를 Dooray 메시지 형식의 Attachment로 변환
   * @returns Attachment 객체
   */
  toAttachment(): AttachmentDto {
    let text = '';

    if (this.isLunchBox()) {
      text = this.getLunchBoxMenuText();
    } else if (this.isPlus()) {
      text = this.getPlusMenuText();
    } else {
      text = this.getStandardMenuText();
    }

    return {
      title: this.getLabel(),
      text,
    };
  }
}

export default Course;
