import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./config/Routes";
import Nav from "./config/Nav.js";
import { LedgerContext } from "./context/LedgerContext";
import { login } from "./config/user";

class App extends Component {
  constructor(props) {
    super(props);

    this.dataTransfer = data => {
      this.setState({ contextData: data });
    };

    this.dateTransfer = (startDate, endDate) => {
      this.setState({ startDate: startDate, endDate: endDate });
    };

    this.state = {
      contextData: [],
      budgetDates: {},
      dataTransfer: this.dataTransfer,
      dateTransfer: this.dateTransfer
    };
  }
  render() {
    console.log("apprender", this.state);
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
