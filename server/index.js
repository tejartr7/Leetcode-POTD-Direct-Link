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
export const questionOfTodayQuery = `
  query questionOfToday {
    activeDailyCodingChallengeQuestion {
      date
      userStatus
      link
      question {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        hasVideoSolution
        hasSolution
        topicTags {
          name
          id
          slug
        }
      }
    }
  }
`;
const fetchGraphQLData = async (query, variables) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };
  try {
    const response = await fetch(BASE_URL, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

app.use('/leetcode',router);


const PORT = 8000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
