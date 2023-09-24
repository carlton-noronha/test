import { useEffect, useReducer } from "react";
import Error from "./components/Error";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Main from "./components/Main";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import Timer from "./components/Timer";

const SECONDS_PER_QUESTION = 20;

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  status: "loading", // loading, error, ready, active, finished
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: Math.max(state.highscore, state.points),
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      return state;
  }
};

const App = () => {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useEffect(() => {
    const controller = new AbortController();
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions", {
          signal: controller.signal,
        });
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    };
    fetchQuestions();
    return () => controller.abort();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numberOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numberOfQuestions={numOfQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <>
                <Timer
                  secondsRemaining={secondsRemaining}
                  dispatch={dispatch}
                />
                {answer !== null && (
                  <NextButton
                    dispatch={dispatch}
                    numOfQuestions={numOfQuestions}
                    index={index}
                  />
                )}
              </>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
