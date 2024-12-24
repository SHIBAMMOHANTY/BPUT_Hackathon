import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import ProjectExplorer from "./pages/ProjectExplorer";
import KnowledgeHub from "./pages/KnowledgeHub";
import Events from "./pages/Events";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./pages/Profile";






const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="mt-6 px-6">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/project-explorer" element={<ProjectExplorer />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
