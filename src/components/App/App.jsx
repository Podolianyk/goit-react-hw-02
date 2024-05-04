import { useState, useEffect } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import css from "./App.module.css";

const clickState = { good: 0, neutral: 0, bad: 0 };

export default function App() {
  const [clicks, setClicks] = useState(() => {
    const savedClicks = localStorage.getItem("my-clicks");
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return clickState;
  });

  useEffect(() => {
    localStorage.setItem("my-clicks", JSON.stringify(clicks));
  }, [clicks]);

  const updateFeedback = (option) => {
    setClicks({
      ...clicks,
      [option]: clicks[option] + 1,
    });
  };

  const handleReset = () => {
    setClicks(clickState);
  };

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;

  return (
    <div className={css.container}>
      <Description />
      <Options
        clicks={clicks}
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        handleReset={handleReset}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={clicks.good}
          neutral={clicks.neutral}
          bad={clicks.bad}
          totalFeedback={totalFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
