import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizPage from "./components/QuizPage";
import HomePage from "./components/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />}></Route>
        <Route path="/questionnaire/:id" element={<QuizPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
