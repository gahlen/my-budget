import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./config/Routes";
import Nav from "./config/Nav.js";
import { LedgerContext, contextData } from "./context/LedgerContext";
import { login } from "./config/user";

class App extends Component {
  constructor(props) {
    super(props);

  this.dataTransfer = (data) => {
    this.setState({contextData: data})
    this.setState({difference: data - 100})
  }

  this.state = {
    contextData: [],
    dataTransfer: this.dataTransfer
  }
}
  render() {
    return (
      <LedgerContext.Provider value={this.state}>
      <Router>
        <Nav />
        <Routes login={login} />
      </Router>
      </LedgerContext.Provider>
    );
  }
}




export default App;
const container = document.createElement("div");
document.body.appendChild(container);
