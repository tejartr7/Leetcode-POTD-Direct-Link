import express from "express";
import cors from "cors";
import LeetCode from "leetcode-query";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req, res) => {
  const leetcode = new LeetCode();
  try {
    const daily = await leetcode.daily();
    if (daily && daily.link) {
      console.log("Redirecting to: ", "https://leetcode.com" + daily.link);
      res.redirect("https://leetcode.com" + daily.link);
    } else {
      console.error("Daily challenge link not found");
      res.status(404).json({ message: "Daily challenge link not found" });
    }
  } catch (e) {
    console.error("Error fetching daily challenge:", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
