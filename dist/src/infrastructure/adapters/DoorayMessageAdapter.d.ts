import { MessageService } from '@/application/ports/MessageService';
import { CourseListDisplayData } from '@/domain/types';
/**
 * MessageService 인터페이스의 Dooray 메시지 어댑터 구현체
 */
export declare class DoorayMessageAdapter implements MessageService {
    private readonly botName;
    constructor(botName?: string);
    private createAttachments;
    /**
     * Dooray Webhook을 통해 메시지를 전송합니다.
     */
    sendMessage(title: string, contents: CourseListDisplayData): Promise<void>;
}
