import { chromium } from "playwright";
import * as fs from "fs";
import { test } from "@playwright/test";
import XlsxFile from "../src/XlsxFile";
import dotenv from "dotenv";

dotenv.config();

test("crawl menu sheet", async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("https://whatsup.nhnent.com/nd/board/list/2525", {
    waitUntil: "networkidle",
  });

  if (!process.env.WHATSUP_ID || !process.env.WHATSUP_PW) {
    throw Error("Cannot find WHATS UP ID/PW. Please provide ID/PW in .env");
  }

  await page.locator("input#username.input-type").fill(process.env.WHATSUP_ID);
  await page.locator("input#password.input-type").fill(process.env.WHATSUP_PW);
  await page.getByRole("button", { name: "submit" }).click();
  await page.goto("https://whatsup.nhnent.com/");

  await page.getByRole("link", { name: "복리후생", exact: true }).click();
  await page
    .getByRole("link", { name: /PORT629주간메뉴/ })
    .first()
    .click();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: /첨부파일/ }).click();
  await page.getByRole("link", { name: /주간식단표/ }).click();
  const download = await downloadPromise;
  const path = await download.path();

  const xlsxFile = new XlsxFile(path);
  fs.writeFile("lunch.json", JSON.stringify(xlsxFile.parse()), (error) => {
    if (error) throw error;
  });
});
