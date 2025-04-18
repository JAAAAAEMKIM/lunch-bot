import { AttachmentDto } from '@/domain/types.js';

/**
 * 메시지 발송 서비스 인터페이스 (출력 포트)
 */
export interface MessageService {
  /**
   * 메시지를 전송합니다.
   * @param channelType 채널 타입 (FE, GROUP, TEST 등)
   * @param attachments 첨부 내용
   * @param text 기본 텍스트
   */
  sendMessage(
    channelType: string,
    attachments?: AttachmentDto[],
    text?: string
  ): Promise<void>;
}
