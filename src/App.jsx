import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import KnowledgeBase from './pages/KnowledgeBase';
import InterviewQuestions from './pages/InterviewQuestions';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  if (isHome) return null;

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Interview Hub
            </Link>
          </div>
          <div className="flex items-center gap-8">
            <Link
              to="/knowledge"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              📚 Knowledge Base
            </Link>
            <Link
              to="/questions"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              ❓ Interview Questions
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/questions" element={<InterviewQuestions />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
