import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "automation",
  fullyParallel: true,
  use: {
    baseURL: "https://whatsup.nhnent.com",
    locale: "ko-KR",
    timezoneId: "Asia/Seoul",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
