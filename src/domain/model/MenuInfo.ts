/**
 * 메뉴 정보를 표현하는 도메인 모델
 */
export interface MenuIndices {
  nameIdx: number;
  caloryIdx: number;
  proteinIdx: number;
}

class MenuInfo {
  private data: (string | number | null | undefined)[];
  private indices: MenuIndices;
  
  constructor(
    data: (string | number | null | undefined)[], 
    indices: MenuIndices
  ) {
    this.data = data;
    this.indices = indices;
  }

  /**
   * 원시 메뉴 데이터와 인덱스 정보로 MenuInfo 객체를 생성합니다.
   * @param rawMenu 원시 메뉴 데이터
   * @param indices 메뉴 인덱스 정보
   * @returns 생성된 MenuInfo 객체
   */
  static fromRawData(
    rawMenu: (string | number | null | undefined)[], 
    indices: MenuIndices
  ): MenuInfo {
    return new MenuInfo(rawMenu, indices);
  }

  /**
   * 메뉴 이름 반환
   * @returns 메뉴 이름
   */
  getName(): string {
    return String(this.data[this.indices.nameIdx] || "").replace("\r\n", " ");
  }

  /**
   * 칼로리 값 반환
   * @returns 칼로리 값
   */
  getCalory(): number {
    return Number(this.data[this.indices.caloryIdx]) || 0;
  }

  /**
   * 단백질 값 반환
   * @returns 단백질 값
   */
  getProtein(): number {
    return Number(this.data[this.indices.proteinIdx]) || 0;
  }

  /**
   * 메뉴가 특정 패턴과 일치하는지 확인
   * @param pattern 확인할 정규식 패턴
   * @returns 패턴 일치 여부
   */
  matchesPattern(pattern: RegExp): boolean {
    return pattern.test(this.getName());
  }
}

export default MenuInfo;