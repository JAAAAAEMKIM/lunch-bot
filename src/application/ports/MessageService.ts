import { CourseListDisplayData } from '@/domain/types';

/**
 * 메시지 발송 서비스 인터페이스 (출력 포트)
 */
export interface MessageService {
  sendMessage(title: string, contents: CourseListDisplayData): Promise<void>;
}
