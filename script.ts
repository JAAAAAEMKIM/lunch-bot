import { sendMessage } from "@/ApiService";
import MealData, { MEAL } from "@/MealData";
import State from "@/State";
import data from "./lunch.json";
import CourseList from "@/CourseList";
import { BOT_API_URL } from "@/constants";
import { getRandomEmoji } from "@/EmojiService";

const getToday = () => {
  const date = new Date();
  if (date.getDay() === 0) {
    return 7;
  }
  return date.getDay() - 1;
};

const start = async () => {
  const flags = process.argv.slice(2);
  const state = State.getInstance();
  state.set({
    isDev: Boolean(flags.find((f) => f === "--dev")) || false,
    meal: Boolean(flags.find((f) => f === "--dinner"))
      ? MEAL.DINNER
      : MEAL.LUNCH,
    channel: Boolean(flags.find((f) => f === "--chan2")) ? 2 : 1,
  });

  const today = getToday();

  if (today > 4) {
    console.log("weekend");
    return;
  }

  const isLunch = state.meal === MEAL.LUNCH;
  const mealData = new MealData(data);
  const meal = isLunch
    ? mealData.getByDay(today).lunch
    : mealData.getByDay(today).dinner;

  const attachments = new CourseList(meal).toAttachments(isLunch);
  const text = getRandomEmoji(5);

  const url = state.isDev
    ? BOT_API_URL.TEST
    : state.channel === 1
      ? BOT_API_URL.FE
      : BOT_API_URL.GROUP;

  if (!url) {
    throw Error("No URL found.");
  }

  await sendMessage(url, attachments, text);

  console.log(attachments);
  console.log("END");
};

start();
