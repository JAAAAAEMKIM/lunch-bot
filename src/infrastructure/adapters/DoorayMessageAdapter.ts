import { MessageService } from '@/application/ports/MessageService';
import { AttachmentDto } from '@/domain/types';
import fetch from 'node-fetch';
import { BOT_API_URL } from '@/infrastructure/constants';

/**
 * MessageService 인터페이스의 Dooray 메시지 어댑터 구현체
 */
export class DoorayMessageAdapter implements MessageService {
  private readonly botName: string;

  /**
   * @param botName 메시지를 보낼 봇 이름
   */
  constructor(botName: string = '밥먹으러 갈까요🍚') {
    this.botName = botName;
  }

  /**
   * 채널 타입에 따른 URL을 반환합니다.
   * @param channelType 채널 타입 (FE, GROUP, TEST)
   * @returns Dooray Webhook URL
   */
  private getUrlByChannelType(channelType: string): string {
    switch (channelType) {
      case 'FE':
        return BOT_API_URL.FE;
      case 'GROUP':
        return BOT_API_URL.GROUP;
      case 'TEST':
        return BOT_API_URL.TEST;
      default:
        throw new Error(`지원하지 않는 채널 타입입니다: ${channelType}`);
    }
  }

  /**
   * Dooray Webhook을 통해 메시지를 전송합니다.
   * @param channelType 채널 타입 (FE, GROUP, TEST)
   * @param attachments 첨부 내용
   * @param text 기본 텍스트
   */
  async sendMessage(
    channelType: string,
    attachments?: AttachmentDto[],
    text?: string
  ): Promise<void> {
    const url = this.getUrlByChannelType(channelType);

    if (!url) {
      throw new Error(
        `${channelType} 채널의 URL이 설정되지 않았습니다. 환경 변수를 확인해주세요.`
      );
    }

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        botName: this.botName,
        attachments,
        text,
      }),
    });

    if (!result.ok) {
      throw new Error(
        `메시지 전송에 실패했습니다. 상태 코드: ${result.status}`
      );
    }
  }
}
