const NextButton = ({ dispatch, numOfQuestions, index }) => {
  const isLastQuestion = index === numOfQuestions - 1;
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
