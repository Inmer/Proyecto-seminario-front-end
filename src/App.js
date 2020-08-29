import React, { Fragment } from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
function App() {
  return (
    <Router>
      <Route path="/home" component={Home} />
      <Route path="/" exact component={Login} />
    </Router>
  );
}

export default App;
