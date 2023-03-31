import { useState, useEffect } from "react";

const Question = ({ question, handleAnswer, isAnswered }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  const handleOkClick = () => {
    if (selectedOption !== null) {
      handleAnswer(selectedOption);
    }
  };

  useEffect(() => {
    let intervalId;
    if (!isAnswered) {
      intervalId = setInterval(() => {
        setSecondsLeft((secondsLeft) => secondsLeft - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isAnswered]);

  useEffect(() => {
    if (secondsLeft <= 0 && !isAnswered) {
      handleAnswer(null);
    }
  }, [secondsLeft, isAnswered, handleAnswer]);

  useEffect(() => {
    setSelectedOption(null);
    setSecondsLeft(10);
  }, [question]);

  return (
    <div>
      <h2 data-testid="question">{question.question}</h2>
      <p>Time left: {secondsLeft} seconds</p>
      <form>
        <label>
          <input
            type="radio"
            value="1"
            checked={selectedOption === 1}
            onChange={handleOptionChange}
            data-testid="option-1"
          />
          {question.option1}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="2"
            checked={selectedOption === 2}
            onChange={handleOptionChange}
            data-testid="option-2"
          />
          {question.option2}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="3"
            checked={selectedOption === 3}
            onChange={handleOptionChange}
            data-testid="option-3"
          />
          {question.option3}
        </label>
        <br />
        <label>
          <input
            type="radio"
            value="4"
            checked={selectedOption === 4}
            onChange={handleOptionChange}
            data-testid="option-4"
          />
          {question.option4}
        </label>
      </form>
      <button onClick={handleOkClick} disabled={isAnswered}>
        Answer
      </button>
    </div>
  );
};

export default Question;
