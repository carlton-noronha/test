import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

const Question = () => {
  const { questions, index } = useQuiz();

  const { question, options, correctOption } = questions[index];

  return (
    <div>
      <h4>{question}</h4>
      <Options options={options} correctOption={correctOption} />
    </div>
  );
};

export default Question;
