import { useState, useEffect } from "react";
import Content from "../Content/Content";
import Feedback from "../Feedback/Feedback";
import Options from "../Options/Options";
import Description from "../Description/Description";
import Notification from "../Notification/Notification";

const initialFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function getInitialFeedback() {
  const savedFeedback = window.localStorage.getItem("current-feedback");
  return savedFeedback !== null ? JSON.parse(savedFeedback) : initialFeedback;
}

export default function App() {
  const [feedback, setFeedback] = useState(getInitialFeedback);

  useEffect(() => {
    window.localStorage.setItem("current-feedback", JSON.stringify(feedback));
  }, [feedback]);

  function updateFeedback(feedbackType) {
    setFeedback({
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    });
  }

  function resetFeedback() {
    setFeedback(initialFeedback);
  }

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback
    ? Math.round((feedback.good / totalFeedback) * 100)
    : 0;

  return (
    <div className="app">
      <Content>Sip Happens Café</Content>
      <Description>
        Please leave your feedback about our service by selecting one of the
        options below.
      </Description>
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback ? (
        <Feedback
          good={feedback.good}
          neutral={feedback.neutral}
          bad={feedback.bad}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}
