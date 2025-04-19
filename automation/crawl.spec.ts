import { chromium } from 'playwright';
import { test } from '@playwright/test';
import dotenv from 'dotenv';
import App from '@/App';

dotenv.config();

test('crawl menu sheet', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  // WhatsUp URL을 환경 변수에서 가져옴
  await page.goto(process.env.WHATSUP_BOARD_URL || '', {
    waitUntil: 'networkidle',
  });

  if (!process.env.WHATSUP_ID || !process.env.WHATSUP_PW) {
    throw Error('Cannot find WHATS UP ID/PW. Please provide ID/PW in .env');
  }

  await page.locator('input#username.input-type').fill(process.env.WHATSUP_ID);
  await page.locator('input#password.input-type').fill(process.env.WHATSUP_PW);
  await page.getByRole('button', { name: 'submit' }).click();

  // 메인 페이지 URL 환경 변수 사용
  await page.goto(process.env.WHATSUP_HOME_URL || '');

  await page.getByRole('link', { name: '복리후생', exact: true }).click();
  await page
    .getByRole('link', { name: /PORT629주간메뉴/ })
    .first()
    .click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: /첨부파일/ }).click();
  await page.getByRole('link', { name: /\.xlsx/ }).click();
  const download = await downloadPromise;
  const path = await download.path();

  if (!path) {
    throw new Error('다운로드 파일 경로를 찾을 수 없습니다.');
  }

  // 앱 인스턴스를 통해 유스케이스 직접 호출
  const app = App.getInstance();
  const result = await app.crawlAndSaveMealData();

  if (result) {
    console.log('식단 데이터가 성공적으로 저장되었습니다.');
  } else {
    console.error('식단 데이터 저장에 실패했습니다.');
  }

  await browser.close();
});
