import { useQuiz } from "../contexts/QuizContext";

const NextButton = () => {
  const { dispatch, numberOfQuestions, index } = useQuiz();
  
  const isLastQuestion = index === numberOfQuestions - 1;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })
      }
    >
      {isLastQuestion ? "Finish" : "Next"}
    </button>
  );
};

export default NextButton;
