
export const MEAL = {
  DINNER: "dinner",
  LUNCH: "lunch",
} as const;
export type MEAL = (typeof MEAL)[keyof typeof MEAL];
