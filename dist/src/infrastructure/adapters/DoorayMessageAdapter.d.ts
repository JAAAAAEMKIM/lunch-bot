import { MessageService } from '@/application/ports/MessageService';
import { AttachmentDto } from '@/domain/types';
/**
 * MessageService 인터페이스의 Dooray 메시지 어댑터 구현체
 */
export declare class DoorayMessageAdapter implements MessageService {
    private readonly botName;
    /**
     * @param botName 메시지를 보낼 봇 이름
     */
    constructor(botName?: string);
    /**
     * 채널 타입에 따른 URL을 반환합니다.
     * @param channelType 채널 타입 (FE, GROUP, TEST)
     * @returns Dooray Webhook URL
     */
    private getUrlByChannelType;
    /**
     * Dooray Webhook을 통해 메시지를 전송합니다.
     * @param channelType 채널 타입 (FE, GROUP, TEST)
     * @param attachments 첨부 내용
     * @param text 기본 텍스트
     */
    sendMessage(channelType: string, attachments?: AttachmentDto[], text?: string): Promise<void>;
}
