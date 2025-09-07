import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BoardsProvider } from "./context/BoardsContext";
import DashboardPage from "./components/DashboardPage";
import BoardPage from "./components/BoardPage";

function App() {
  return (
    <BoardsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/board/:boardId" element={<BoardPage />} />
        </Routes>
      </Router>
    </BoardsProvider>
  );
}

export default App;
