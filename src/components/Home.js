import React, { Component } from "react";
import { LedgerContext } from "../context/LedgerContext";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: ""
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSetDate = dateTransfer => {
    console.log("home", this.state.startDate, this.state.endDate);
    dateTransfer(this.state.startDate, this.state.endDate)
  };

  componentDidMount() {}

  render() {
    let date = this.context;
    return (
      <React.Fragment>
        <form
          className="container animate flexCol"
        >
          <label htmlFor="startDate">
            <b>Budget Month Start Date</b>
          </label>
          <input
            className="inputSize"
            type="text"
            placeholder="  yyyy-mm-dd"
            name="startDate"
            onChange={this.handleChange}
            required
          />
          <label htmlFor="endDate">
            <b>Budget Month End Date</b>
          </label>
          <input
            className="inputSize"
            type="text"
            placeholder="  yyyy-mm-dd"
            name="endDate"
            onChange={this.handleChange}
            required
          />
         
          <LedgerContext.Consumer>
        {({ dateTransfer }) => (
        <button className="btnSize" type="button" onClick={() => this.handleSetDate(dateTransfer)}>
          Set Date
        </button>
        )}
        </LedgerContext.Consumer>

          <button
            className="btnSize"
            type="submit"
            onClick={this.handleAdvance}
          >
            Adv Budget
          </button>
        </form>
      </React.Fragment>
    );
  }
}
export default Home;
