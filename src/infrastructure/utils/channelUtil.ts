import { BOT_API_URL } from '@/infrastructure/constants';

export type ChannelNumber = 0 | 1 | 2;

export const getUrlByChannelType = (channel: ChannelNumber): string => {
  switch (channel) {
    case 0:
      return BOT_API_URL.TEST;
    case 1:
      return BOT_API_URL.FE;
    case 2:
      return BOT_API_URL.GROUP;
    default:
      throw new Error(`지원하지 않는 채널 타입입니다: ${channel}`);
  }
};
