import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './config/Routes';
import Nav from "../src/config/Nav.js";
import { login } from './config/user'

class App extends Component {

  render() {
    return (
      <Router>
        <Nav />
        <Routes
          login={login}
        />
      </Router>
    );
  }
}
export default App;
const container = document.createElement("div");
document.body.appendChild(container);
