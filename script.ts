import { sendMessage } from "@/ApiService";
import MealData, { MEAL } from "@/MealData";
import State from "@/State";
import data from "./lunch.json";
import CourseList from "@/CourseList";

const getToday = () => {
  const date = new Date();
  if (date.getDay() === 0) {
    return 7;
  }
  return date.getDay() - 1;
};

const start = async () => {
  const flags = Bun.argv.slice(2);
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

  const url = state.isDev
    ? process.env.BOT_API_URL_TEST
    : state.channel === 1
      ? process.env.BOT_API_URL_FE
      : process.env.BOT_API_URL_GROUP;

  if (!url) {
    throw Error("No URL found.");
  }

  await sendMessage(url, attachments);

  console.log(attachments);
  console.log("END");
};

start();
