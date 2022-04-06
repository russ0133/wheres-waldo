import React from "react";
import Login from "./components/Login";
import App from "./App";
import Register from "./components/Register";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function RouterSwitch() {
  return (
    <div className="RouterSwitch">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app" element={<App />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default RouterSwitch;
