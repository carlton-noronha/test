import Options from "./Options";

const Question = ({
  question: { question, options, correctOption },
  answer,
  dispatch,
}) => {
  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
};

export default Question;
