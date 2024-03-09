import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Import fetch to make HTTP requests
import LeetCode from "leetcode-query";
import router from "./routes/leetcode.js";
const BASE_URL = "https://leetcode.com/graphql";
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use('/leetcode',router);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
