import FileRepository from "./src/FileRepository";
import { Course } from "./src/MealData";

// Menu
const BOT_API_URL_2 =
  "https://hook.dooray.com/services/3036349505739914786/3671121977471694703/jjLrDwA7TciUrZ4PUvTAiA";

// FE
const BOT_API_URL =
  "https://hook.dooray.com/services/3036349505739914786/3671781334191004776/uMh3AktTSbKWyyBvzaO4FA";

// ME
const BOT_API_URL_TEST =
  "https://hook.dooray.com/services/1387695619080878080/2945758919024115073/vQ5K1tziTmCMf1282uvycg";

const MEAL = {
  DINNER: "dinner",
  LUNCH: "lunch",
} as const;
type MEAL = (typeof MEAL)[keyof typeof MEAL];

type STATE = {
  isDev: boolean;
  channel: 1 | 2;
  meal: MEAL;
};
const state: STATE = {
  isDev: false,
  meal: MEAL.LUNCH,
  channel: 1,
};

type Attachment = {
  title: string;
  text?: string;
  imageurl?: string;
};

const sendMessage = async (text: string, attachments?: Attachment[]) => {
  if (state.isDev) {
    console.log(text);
  }

  const url = state.isDev
    ? BOT_API_URL_TEST
    : state.channel === 1
      ? BOT_API_URL
      : BOT_API_URL_2;

  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      botName: "밥먹으러 갈까요🍚",
      attachments,
    }),
  });

  return result.json();
};

const getToday = () => {
  const date = new Date();
  if (date.getDay() === 0) {
    return 7;
  }
  return date.getDay() - 1;
};

const getAttachments = (meal: Course[], day: number) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const dateNumber = date.getDate();
  const title =
    state.meal === MEAL.LUNCH ? "오늘의 점심 메뉴" : "오늘의 저녁 메뉴";

  const courses = meal.map((course) => ({
    title: course.calories
      ? `${course.label} - ${course.calories} kcal`
      : course.label,
    text: course.menus.join("\n"),
  }));
  return [{ title: `${month}/${dateNumber} - ${title}` }, ...courses];
};

const start = async () => {
  const flags = Bun.argv.slice(2);
  state.isDev = Boolean(flags.find((f) => f === "--dev")) || false;
  state.meal = Boolean(flags.find((f) => f === "--dinner"))
    ? MEAL.DINNER
    : MEAL.LUNCH;
  // state.mode = Boolean(flags.find((f) => f === "--normal"))
  //   ? MODE.NORMAL
  //   : Boolean(flags.find((f) => f === "--bot"))
  //     ? MODE.BOT
  //     : MODE.CHANNEL;
  state.channel = Boolean(flags.find((f) => f === "--chan2")) ? 2 : 1;

  const today = getToday();
  // const today = 1;

  if (today > 4) {
    console.log("weekend");
    return;
  }
  const mealData = FileRepository();
  const meal =
    state.meal === MEAL.LUNCH
      ? mealData.getLunch(today)
      : mealData.getDinner(today);
  const attachments = getAttachments(meal, today);
  await sendMessage("", attachments);
  console.log(attachments);
  console.log("END");
};

start();
