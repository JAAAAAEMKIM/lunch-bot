import { ChannelNumber } from '@/infrastructure/utils/channelUtil';
declare class Config {
    isDev: boolean;
    isLunch: boolean;
    channel: ChannelNumber;
    private static instance;
    private constructor();
    static getInstance(): Config;
}
export default Config;
