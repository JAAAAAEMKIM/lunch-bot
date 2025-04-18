import { AttachmentDto, MenuInfoDto } from '@/domain/types';
import MenuInfo, { MenuIndices } from './MenuInfo';
/**
 * 코스 정보를 표현하는 도메인 모델
 */
declare class Course {
    private label;
    private indices;
    private menus;
    constructor(label: string, menus: MenuInfoDto[], indices: MenuIndices);
    /**
     * 원시 메뉴 데이터를 코스에 추가
     * @param rawMenu 원시 메뉴 데이터
     */
    addMenu(rawMenu: (string | number | null | undefined)[]): void;
    /**
     * 코스 라벨 반환
     * @returns 코스 라벨
     */
    getLabel(): string;
    /**
     * 코스에 메뉴가 있는지 확인
     * @returns 메뉴 존재 여부
     */
    hasMenus(): boolean;
    /**
     * "도시락" 코스 여부 확인
     * @returns 도시락 코스 여부
     */
    isLunchBox(): boolean;
    /**
     * "PLUS" 코스 여부 확인
     * @returns PLUS 코스 여부
     */
    isPlus(): boolean;
    /**
     * 특정 패턴과 일치하지 않는 메뉴만 필터링
     * @param pattern 제외할 패턴
     * @returns 필터링된 메뉴 목록
     */
    getFilteredMenus(pattern: RegExp): MenuInfo[];
    /**
     * 도시락 코스의 메뉴 텍스트 생성
     * @returns 메뉴 텍스트
     */
    getLunchBoxMenuText(): string;
    /**
     * PLUS 코스의 메뉴 텍스트 생성
     * @returns 메뉴 텍스트
     */
    getPlusMenuText(): string;
    /**
     * 일반 코스의 메뉴 텍스트 생성
     * @returns 메뉴 텍스트
     */
    getStandardMenuText(): string;
    /**
     * 코스를 Dooray 메시지 형식의 Attachment로 변환
     * @returns Attachment 객체
     */
    toAttachment(): AttachmentDto;
}
export default Course;
