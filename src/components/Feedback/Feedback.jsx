import css from "./Feedback.module.css";

export default function Feedback({
  good,
  neutral,
  bad,
  totalFeedback,
  positiveFeedback,
}) {
  return (
    <ul>
      <li className={css.listItem}>Good:{good}</li>
      <li className={css.listItem}>Neutral:{neutral}</li>
      <li className={css.listItem}>Bad:{bad}</li>
      {totalFeedback > 0 ? (
        <div>
          <li className={css.listItem}>Total:{totalFeedback}</li>
          <li className={css.listItem}>Positive:{positiveFeedback}%</li>
        </div>
      ) : (
        ""
      )}
    </ul>
  );
}
