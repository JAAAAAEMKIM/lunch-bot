# Lunch Bot

식단 정보 수집 및 메시지 전송을 자동화하는 봇 애플리케이션입니다. WhatsUp 게시판에서 주간 식단표를 자동으로 크롤링하고, Dooray 메신저로 일일 식단 정보를 전송합니다.

## 주요 기능

- 📊 **주간 식단표 자동 크롤링**: WhatsUp 게시판에서 Excel 형식의 식단표를 자동으로 다운로드
- 📝 **식단 데이터 파싱**: 다운로드한 Excel 파일을 JSON 형식으로 변환하여 저장
- 🍽️ **일일 식단 알림**: 평일 점심/저녁 식단 정보를 Dooray 메신저로 자동 전송
- 🔄 **다양한 채널 지원**: 개발 테스트용, FE팀, 그룹 채팅방 등 다양한 채널 지원

## 프로젝트 설치 및 실행

### 의존성 설치

```bash
pnpm install
```

### 웹 브라우저 자동화 도구 설치 (식단 크롤링용)

```bash
pnpm exec playwright install
```

### 빌드

```bash
pnpm build
```

### 식단 정보 다운로드 및 처리

```bash
pnpm download
```

### 식단 메시지 전송

```bash
# 개발 모드 (테스트 채널에 전송)
pnpm dev

# 기본 실행 (FE 채팅방에 점심 식단 전송)
pnpm start

# 저녁 식단 전송
pnpm start --dinner

# 그룹 채팅방에 전송
pnpm start --chan2
```

## 환경 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 값들을 설정해야 합니다:

```
# WhatsUp 접속 정보
WHATSUP_ID=your_id
WHATSUP_PW=your_password
WHATSUP_BOARD_URL=https://url.to.board/...
WHATSUP_HOME_URL=https://url.to.home/...

# Dooray 메신저 Webhook URL
FE_WEBHOOK=https://url.to.messenger/...
TEST_WEBHOOK=https://url.to.test.messenger/...
GROUP_WEBHOOK=https://url.to.group.messenger/...
// ... 추가 가능

# 파일 경로 설정
DEFAULT_LUNCH_JSON_PATH=./lunch.json
```

## 주요 구성요소

- **컨트롤러**: `MealController`, `CrawlController` - 외부 요청 처리
- **서비스**: `SendDailyMealService` - 메시지 전송 비즈니스 로직 구현
- **어댑터**: `CrawlServiceAdapter`, `DoorayMessageAdapter` 등 - 외부 서비스 연동
- **리포지토리**: `JsonMealRepository` - 식단 데이터 저장 및 조회
- **자동화 스크립트**: Playwright를 사용한 웹 크롤링 자동화

## 정기 실행 설정

cron을 사용하여 정기적으로 식단 정보를 다운로드하고 전송할 수 있습니다. `cronjob.sh` 스크립트를 활용하세요.

예시:
```
# 매일 오전 11시 점심 식단 전송, 오후 4시 저녁 식단 전송
0 11 * * 1-5 /home1/irteam/apps/lunch-bot/cronjob.sh
0 16 * * 1-5 /home1/irteam/apps/lunch-bot/cronjob.sh --dinner
```

## 테스트

```bash
pnpm test
```
