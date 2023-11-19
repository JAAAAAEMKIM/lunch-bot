import FileRepository from "./src/FileRepository";
//
// const TOKEN = "ajjt1imxmtj4:AlEKb1O3ROuFsaTK8G287w";
// const API_URL = "https://api.dooray.com/messenger/v1/channels/direct-send";
// const CHANNEL_API_URL =
//   "https://api.dooray.com/messenger/v1/channels/3667760352443345772/logs";

// Menu
const BOT_API_URL_2 =
  "https://hook.dooray.com/services/3036349505739914786/3671121977471694703/jjLrDwA7TciUrZ4PUvTAiA";

// FE
const BOT_API_URL =
  "https://hook.dooray.com/services/3036349505739914786/3671781334191004776/uMh3AktTSbKWyyBvzaO4FA";

// ME
const BOT_API_URL_TEST =
  "https://hook.dooray.com/services/1387695619080878080/2945758919024115073/vQ5K1tziTmCMf1282uvycg";

// const MODE = {
//   NORMAL: "normal",
//   CHANNEL: "channel",
//   BOT: "bot",
// } as const;
// type MODE = (typeof MODE)[keyof typeof MODE];

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

const sendMessage = async (text: string) => {
  // if (state.isDev) {
  //   console.log(text);
  //   return text;
  // }

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
      text,
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

const getTextContent = (meal: string[], day: number) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const dateNumber = date.getDate();
  const title =
    state.meal === MEAL.LUNCH ? "오늘의 점심 메뉴" : "오늘의 저녁 메뉴";

  return `${month}/${dateNumber} - ${title}\n
${meal.join("\n")}`;
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
  const message = getTextContent(meal, today);
  await sendMessage(message);
  console.log(message);
  console.log("END");
};

start();
