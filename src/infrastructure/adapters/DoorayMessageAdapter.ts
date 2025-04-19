import { MessageService } from '@/application/ports/MessageService';
import { CourseListDisplayData } from '@/domain/types';
import fetch from 'node-fetch';
import Config from '@/infrastructure/Config';
import { getUrlByChannelType } from '@/infrastructure/utils/channelUtil';
import {
  AttachmentDto,
  convertCourseToAttachment,
} from '@/infrastructure/utils/convertUtil';

/**
 * MessageService 인터페이스의 Dooray 메시지 어댑터 구현체
 */
export class DoorayMessageAdapter implements MessageService {
  constructor(private readonly botName: string = '밥먹으러 갈까요🍚') {}

  private createAttachments(contents: CourseListDisplayData): AttachmentDto[] {
    return contents.courses.map((course) => convertCourseToAttachment(course));
  }

  /**
   * Dooray Webhook을 통해 메시지를 전송합니다.
   */
  async sendMessage(
    title: string,
    contents: CourseListDisplayData
  ): Promise<void> {
    const channel = Config.getInstance().channel;
    const url = getUrlByChannelType(channel);

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        botName: this.botName,
        attachments: this.createAttachments(contents),
        text: title,
      }),
    });

    if (!result.ok) {
      throw new Error(
        `메시지 전송에 실패했습니다. 상태 코드: ${result.status}`
      );
    }
  }
}
