import dotenv from 'dotenv';
import App from '@/App';

// 환경 변수 로드
dotenv.config();

/**
 * 애플리케이션 시작 함수
 */
const start = async () => {
  try {
    // 명령줄 인자 파싱
    const flags = process.argv.slice(2);
    const isDev = Boolean(flags.find((f) => f === '--dev'));
    const isDinner = Boolean(flags.find((f) => f === '--dinner'));
    const isChannel2 = Boolean(flags.find((f) => f === '--chan2'));

    const app = App.getInstance();
    app.setConfig({
      isDev,
      isLunch: !isDinner,
      channel: isDev ? 0 : isChannel2 ? 2 : 1,
    });

    // 설정된 컨텍스트에 따라 메시지 전송
    await app.sendDailyMealMessage();

    console.log('식단 전송이 완료되었습니다.');
  } catch (error) {
    console.error('에러가 발생했습니다:', error);
    process.exit(1);
  }
};

// 애플리케이션 시작
start();
