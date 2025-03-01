import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InterviewPrep from "./pages/InterviewPrep";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/interview" element={<InterviewPrep />} />
      </Routes>
    </Router>
  );
}

export default App;
