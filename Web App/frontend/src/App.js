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
import Dashboard from "./pages/Dashboard";
import Statistics from "./components/Statistics";
import Projects from "./components/Projects";
import Funding from "./components/Funding";
import Reports from "./components/Reports";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/project-explorer" element={<ProjectExplorer />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="statistics" element={<Statistics />} />
            <Route path="projects" element={<Projects />} />
            <Route path="funding" element={<Funding />} />
            <Route path="reports" element={<Reports />} />
            <Route path="events" element={<Events />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
