import { WorkSheet, readFile, set_fs } from "xlsx";
import { join } from "path";
import * as fs from "fs";

set_fs(fs);

const TOKEN = "ajjt1imxmtj4:AlEKb1O3ROuFsaTK8G287w";
const API_URL = "https://api.dooray.com/messenger/v1/channels/direct-send";
const CHANNEL_API_URL =
  "https://api.dooray.com/messenger/v1/channels/3667760352443345772/logs";
const USER_ID = "2914472305406725889";
const FILE_NAME = "lunch.xlsx";

const MODE = {
  NORMAL: "normal",
  CHANNEL: "channel",
} as const;
type MODE = (typeof MODE)[keyof typeof MODE];

const MEAL = {
  DINNER: "dinner",
  LUNCH: "lunch",
} as const;
type MEAL = (typeof MEAL)[keyof typeof MEAL];

type STATE = {
  isDev: boolean;
  mode: MODE;
  meal: MEAL;
};
const state: STATE = {
  isDev: false,
  mode: MODE.CHANNEL,
  meal: MEAL.LUNCH,
};

const sendMessage = async (text: string, organizationMemberId: string) => {
  const url = state.mode === MODE.NORMAL ? API_URL : CHANNEL_API_URL;
  if (state.isDev) {
    console.log(text);
    return text;
  }

  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `dooray-api ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      organizationMemberId,
    }),
  });

  return result.json();
};

const readXlsx = () => {
  const workbook = readFile(join(import.meta.dir, FILE_NAME));
  const sheet = workbook.Sheets[workbook.SheetNames[1]];
  return sheet;
};

const getToday = () => {
  const date = new Date();
  if (date.getDay() === 0) {
    return 7;
  }
  return date.getDay() - 1;
};

const getDayColumn = (dayIdx: number) => ["D", "E", "F", "G", "H"][dayIdx];

const getMenusOfDay = (sheet: WorkSheet, day: number) => {
  const menus = [];
  const column = getDayColumn(day);
  const rows = Object.keys(sheet)
    .map((key) => Number(key.substring(1)))
    .filter((x) => !isNaN(x));

  const categories = Object.keys(sheet).filter((key) => key.startsWith("B"));
  const lunchIdx = Number(
    categories.find((c) => sheet[c]?.v === "점심")?.substring(1)
  );
  const dinnerIdx = Number(
    categories.find((c) => sheet[c]?.v === "저녁")?.substring(1)
  );

  if (!lunchIdx || !dinnerIdx) return [];
  const start = state.meal === MEAL.LUNCH ? lunchIdx : dinnerIdx;
  const end = state.meal === MEAL.LUNCH ? dinnerIdx : rows[rows.length - 1];

  let row = start;
  let dataKey = `${column}${row}`;
  while (row < end) {
    if (sheet[dataKey]) {
      const data = sheet[dataKey]["v"];
      if (typeof data === "number") {
        menus.push(`${data} kcal\n`);
      } else {
        menus.push(data);
      }
    }
    row += 1;
    dataKey = `${column}${row}`;
  }

  return menus.filter(Boolean);
};

const getTextContent = (sheet: WorkSheet, day: number) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const dateNumber = date.getDate();
  const title =
    state.meal === MEAL.LUNCH ? "오늘의 점심 메뉴" : "오늘의 저녁 메뉴";

  return `${month}/${dateNumber} - ${title}\n
${getMenusOfDay(sheet, day).join("\n")}`;
};

const start = async () => {
  const flags = Bun.argv.slice(2);
  state.isDev = Boolean(flags.find((f) => f === "--dev")) || false;
  state.meal = Boolean(flags.find((f) => f === "--dinner"))
    ? MEAL.DINNER
    : MEAL.LUNCH;
  state.mode = Boolean(flags.find((f) => f === "--normal"))
    ? MODE.NORMAL
    : MODE.CHANNEL;

  // const today = getToday();
  const today = 1;

  if (today > 4) {
    console.log("weekend");
    return;
  }
  const sheet = readXlsx();
  const message = getTextContent(sheet, today);
  await sendMessage(message, USER_ID);
  console.log("END");
};

start();
