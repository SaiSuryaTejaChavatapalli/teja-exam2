import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import questionnaireData from "../api/questionnaire.json";

function HomePage() {
  const [questionnaires, setQuestionnaires] = useState([]);

  useEffect(() => {
    // Set the questionnaires state using the data from the JSON file
    setQuestionnaires(questionnaireData);
  }, []);

  return (
    <div>
      <h1>Questionnaires</h1>
      <ul>
        {questionnaires.map((questionnaire) => (
          <li key={questionnaire.id}>
            <h2 data-testid={`title-${questionnaire.title}`}>
              {questionnaire.title}
            </h2>
            <p data-testid="questionnaire-number">
              {questionnaire.questions} Questions
            </p>
            <Link
              to={`/questionnaire/${questionnaire.id}`}
              data-testid="attempt"
            >
              Attempt
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
