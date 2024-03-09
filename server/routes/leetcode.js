import { LeetCode } from "leetcode-query";
import express from "express";
import cors from "cors";

const leetcode = new LeetCode();
const router = express.Router();

router.use(cors({
  origin: "*",
}));

router.use(express.json());

router.get("/dailyChallenge", async (req, res) => {
  console.log("leetcode daily challenge called");
  try {
    const daily = await leetcode.daily();
    if (daily && daily.link) {
      console.log("Redirecting to: ", "https://leetcode.com" + daily.link);
      res.redirect("https://leetcode.com" + daily.link);
    } else {
      res.status(404).json({ message: "Daily challenge link not found" });
    }
  } catch (error) {
    console.error("Error fetching daily challenge:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Add other CORS headers if needed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // Allow credentials if needed
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

export default router;
