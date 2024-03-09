import { LeetCode } from "leetcode-query";
import express from "express";
import cors from "cors";
const leetcode = new LeetCode();
const router = express.Router();
router.use(cors({
    origin: "*",
}));
router.get("/dailyChallenge", async (req, res) => {
  console.log("leetcode daily challenge called");
  try {
    const daily = await leetcode.daily();
    if (daily && daily.link) {
      console.log("Redirecting to: ", "https://leetcode.com" + daily.link);
      res.status(200).json(daily);
      res.send(daily.link + " " + daily.title);
    } else {
      res.status(404).json({ message: "Daily challenge link not found" });
      res.send("Daily challenge link not found");
    }
  } catch (error) {
    console.error("Error fetching daily challenge:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
