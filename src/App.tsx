import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/LoginScreen";
import Base from "./screens/BaseScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/base" element={<Base />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
