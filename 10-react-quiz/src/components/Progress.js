import { useQuiz } from "../contexts/QuizContext";

const Progress = () => {
  const { index, numberOfQuestions, points, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  );
};

export default Progress;
