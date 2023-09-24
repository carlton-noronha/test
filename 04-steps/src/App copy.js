import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const nextPreviousButtonStyle = {
    backgroundColor: "#7950f2",
    color: "#fff",
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep((currentStep) => currentStep - 1);
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep((currentStep) => currentStep + 1);
    }
  };

  return (
    <>
      <button
        className="close"
        onClick={() => setIsOpen((currentlyIsOpen) => !currentlyIsOpen)}
      >
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button style={nextPreviousButtonStyle} onClick={handlePrevious}>
              Previous
            </button>
            <button style={nextPreviousButtonStyle} onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
