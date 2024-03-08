'use client';
import axios from "axios";
import {useState, useEffect} from "react";
import { redirect } from 'next/navigation'
export default function Home() {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await axios.get("http://localhost:8000/leetcode/dailyChallenge",{});
      setQuestion(data);
    };
    if (!question)
      fetchQuestion();
  }, [question]);

  useEffect(() => {
    if (question && question.link) {
      console.log("Redirecting to: ", "https://leetcode.com" + question.link);
      var temp="https://leetcode.com" + question.link;
      console.log(temp);
      redirect(temp);
    }
  }, [question]);

  return (
    <div>
      {question ? (
        <div>
          Redirecting...
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
