import { useQuiz } from "../contexts/QuizContext";

const FinishedScreen = () => {
  const { points, maxPoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} i.e., {Math.round(percentage)}%
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishedScreen;
