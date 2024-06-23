import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
