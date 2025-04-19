import { ChannelNumber } from '@/infrastructure/utils/channelUtil';

class Config {
  private static instance: Config | null = null;

  private constructor(
    public isDev: boolean = false,
    public isLunch: boolean = true,
    public channel: ChannelNumber = 0
  ) {}

  static getInstance() {
    return Config.instance ?? (Config.instance = new Config());
  }
}

export default Config;
