import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import css from "./App.module.css";

const feedbacksState = { good: 0, neutral: 0, bad: 0 };

export default function App() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const savedClicks = localStorage.getItem("feedback");
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return feedbacksState;
  });

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const updateFeedback = (option) => {
    setFeedbacks({
      ...feedbacks,
      [option]: feedbacks[option] + 1,
    });
  };

  const handleReset = () => {
    setFeedbacks(feedbacksState);
  };

  const totalFeedback = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  const positiveFeedback = Math.round((feedbacks.good / totalFeedback) * 100);
  return (
    <div className={css.container}>
      <Description />
      <Options
        clicks={feedbacks}
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        handleReset={handleReset}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={feedbacks.good}
          neutral={feedbacks.neutral}
          bad={feedbacks.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
