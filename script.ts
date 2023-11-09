import { WorkSheet, readFile, set_fs } from "xlsx";
import { join } from "path";
import * as fs from "fs";

set_fs(fs);

const TOKEN = "ajjt1imxmtj4:AlEKb1O3ROuFsaTK8G287w";
const API_URL = "https://api.dooray.com/messenger/v1/channels/direct-send";
const CHANNEL_API_URL =
  "https://api.dooray.com/messenger/v1/channels/3013654474402086458/logs";
const USER_ID = "2914472305406725889";
const FILE_NAME = "lunch.xlsx";

const MODE = {
  NORMAL: "normal",
  CHANNEL: "channel",
} as const;
type MODE = (typeof MODE)[keyof typeof MODE];

const sendMessage = async (
  text: string,
  organizationMemberId: string,
  mode: MODE = MODE.NORMAL
) => {
  const url = mode === MODE.NORMAL ? API_URL : CHANNEL_API_URL;
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
  return date.getDay() - 1;
};

const getDayColumn = (dayIdx: number) => ["D", "E", "F", "G", "H"][dayIdx];

const getMenusOfDay = (sheet: WorkSheet, day: number) => {
  const menus = [];
  const column = getDayColumn(day);
  const rows = Object.keys(sheet)
    .map((key) => Number(key.substring(1)))
    .filter((x) => !isNaN(x));
  const maxRow = Math.max(...rows);
  let row = 5;
  let dataKey = `${column}${row}`;
  while (row < maxRow) {
    if (sheet[dataKey]) {
      const data = sheet[dataKey]["v"];
      menus.push(data);
      if (typeof data === "number") {
        menus.push(" ");
      }
    }
    row += 1;
    dataKey = `${column}${row}`;
  }

  console.log(menus);

  return menus.filter(Boolean);
};

const getTextContent = (sheet: WorkSheet, day: number) => {
  return getMenusOfDay(sheet, day).join("\n");
};

const start = async () => {
  const today = getToday();
  if (today > 4) return;
  const sheet = readXlsx();
  const message = getTextContent(sheet, today);
  await sendMessage(message, USER_ID, "channel");
  console.log("END");
};

start();
