import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Import fetch to make HTTP requests
import { LeetCode, fetcher } from "leetcode-query";
import { chromium } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

const BASE_URL = "https://leetcode.com/graphql";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

fetcher.set(async (...args) => {
  const browser = await chromium.use(stealth()).launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(args[0].toString());

  const res = await page.evaluate(async (args) => {
    const res = await fetch(...args);
    return {
      body: await res.text(),
      status: res.status,
      statusText: res.statusText,
      headers: Object.fromEntries(res.headers.entries()),
    };
  }, args);

  await browser.close();
  return new fetch.Response(res.body, res); // Fix: Use fetch.Response
});

async function main() {
  const lc = new LeetCode();
  const daily = await lc.daily();
  return daily;
}

const PORT = 8000;
app.listen(PORT, async () => {
  console.log("server started on http://localhost:8000");
  const daily = await main();
  app.get("/", (req, res) => {
    res.json(daily);
  });
});
