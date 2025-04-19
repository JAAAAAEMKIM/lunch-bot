import dotenv from 'dotenv';

// .env 파일 로드
dotenv.config();

export const COURSE_REGEX = /코스.*/;
export const PLUS_REGEX = /^Plus.*/;
export const CONCEPT_REGEX = /\[.*\]/;
export const COLUMN_COUNT = 6;
export const CALORY_IDX = 5;
export const RATIO_IDX = 2;
export const PROTEIN_IDX = 3;
export const CATEGORY_IDX = 1;

export const BOT_API_URL = {
  FE: process.env.BOT_API_URL_FE || '',
  GROUP: process.env.BOT_API_URL_GROUP || '',
  TEST: process.env.BOT_API_URL_TEST || '',
};

// 환경 변수 검증
if (!process.env.BOT_API_URL_FE || !process.env.BOT_API_URL_GROUP || !process.env.BOT_API_URL_TEST) {
  console.warn('경고: 일부 BOT API URL 환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}