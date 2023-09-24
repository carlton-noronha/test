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
                    <StepMessage step={step}>{messages[step - 1]}</StepMessage>
                    <div className="buttons">
                        <Button
                            textColor={nextPreviousButtonStyle.color}
                            backgroundColor={
                                nextPreviousButtonStyle.backgroundColor
                            }
                            onClick={handlePrevious}
                        >
                            <span>👈🏼</span> Previous
                        </Button>
                        <Button
                            textColor={nextPreviousButtonStyle.color}
                            backgroundColor={
                                nextPreviousButtonStyle.backgroundColor
                            }
                            onClick={handleNext}
                        >
                            Next <span>👉🏼</span>
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

const StepMessage = ({ step, children }) => {
    return (
        <div className="message">
            <h3>Step {step}:</h3> {children}
        </div>
    );
};

const Button = ({ backgroundColor, textColor, onClick, children }) => {
    const nextPreviousButtonStyle = {
        backgroundColor: backgroundColor,
        color: textColor,
    };
    return (
        <button style={nextPreviousButtonStyle} onClick={onClick}>
            {children}
        </button>
    );
};

export default App;
