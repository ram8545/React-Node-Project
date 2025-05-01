import React from "react";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
