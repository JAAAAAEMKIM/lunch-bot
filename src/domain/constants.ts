export const MEAL = {
  DINNER: 'dinner',
  LUNCH: 'lunch',
} as const;
export type MEAL = (typeof MEAL)[keyof typeof MEAL];

export const COURSE_TYPE = {
  STANDARD: 'standard',
  PLUS: 'plus',
  LUNCHBOX: 'lunchbox',
} as const;

export type COURSE_TYPE = (typeof COURSE_TYPE)[keyof typeof COURSE_TYPE];
