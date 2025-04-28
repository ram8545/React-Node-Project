import React from "react";
import SignUp from "./Components/SignUp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LogIn from "./Components/LogIn";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path="/" element={<SignUp />} />
          </Route>
          <Route>
            <Route path="/login" element={<LogIn />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
