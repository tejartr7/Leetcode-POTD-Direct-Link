import { LeetCode } from "leetcode-query";
import express from "express";
const leetcode = new LeetCode();
const router = express.Router();

router.get("/dailyChallenge", async (req, res) => {
  console.log("leetcode daily challenge called")
  const daily=await leetcode.daily();
  if(daily){
    res.status(200).json(daily);
  }
  else{
    res.status(500).json({message:"Internal Server Error"});
  }
});
export default router;