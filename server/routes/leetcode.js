import express from "express";
import cors from "cors";
import { chromium } from "playwright";
import LeetCode from "leetcode-query";

const router = express.Router();
const leetcode = new LeetCode();

router.use(cors({
  origin: "*",
}));

router.use(express.json());

router.get("/dailyChallenge", async (req, res) => {
  console.log("LeetCode daily challenge called");
  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const daily = await leetcode.daily();
    if (daily && daily.link) {
      const redirectUrl = "https://leetcode.com" + daily.link;
      console.log("Redirecting to: ", redirectUrl);
      res.redirect(redirectUrl); // Redirect the user to the challenge page
    } else {
      console.error("Daily challenge link not found");
      res.status(404).json({ message: "Daily challenge link not found" });
    }

    await browser.close(); // Close the browser after redirection
  } catch (error) {
    console.error("Error redirecting to daily challenge:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

export default router;
