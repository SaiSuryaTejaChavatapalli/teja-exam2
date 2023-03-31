import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import questionBank from "../api/questionBank.json";

const QuizPage = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const { id } = useParams();

  const currentQuestion = questionBank.find((qb) => qb.id === parseInt(id))
    .questionbank[questionIndex];

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  const handleOkClick = () => {
    if (selectedOption !== null) {
      setIsAnswered(true);
      if (selectedOption === currentQuestion.Answer) {
        setIsCorrect(true);
        setScore(score + 1);
      } else {
        setIsCorrect(false);
      }
    }
  };

  const handleNextClick = () => {
    setQuestionIndex(questionIndex + 1);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedOption(null);
  };

  useEffect(() => {
    if (questionIndex >= currentQuestion.length) {
      setIsFinished(true);
    }
  }, [questionIndex]);
  console.log(score);
  return (
    <div>
      {!isFinished ? (
        <>
          <h2 data-testid="question">{currentQuestion.Question}</h2>
          <form>
            <label>
              <input
                type="radio"
                value="1"
                checked={selectedOption === 1}
                onChange={handleOptionChange}
                data-testid="option-1"
              />
              {currentQuestion.Option1}
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
              {currentQuestion.Option2}
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
              {currentQuestion.Option3}
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
              {currentQuestion.Option4}
            </label>
          </form>
          <button onClick={handleOkClick} data-testid="ok">
            Ok
          </button>
          <button onClick={handleNextClick} data-testid="next">
            Next
          </button>
          {isAnswered && (
            <p
              data-testid="validate-answer"
              style={{ color: isCorrect ? "green" : "red" }}
            >
              {isCorrect ? "Correct!" : "Wrong!"}
            </p>
          )}
        </>
      ) : (
        <>
          <h2>Congratulations!</h2>
          <p data-testid="score">Your score is: {score}</p>
        </>
      )}
    </div>
  );
};

export default QuizPage;
