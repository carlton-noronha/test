const Options = ({ options, dispatch, answer, correctOption }) => {
  const isQuestionAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          disabled={isQuestionAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isQuestionAnswered
              ? index === correctOption
                ? "correct"
                : "wrong"
              : ''
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
