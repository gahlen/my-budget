import React, {Component} from "react";
import BudgetList from "./BudgetList";
import "../styles/Budget.css";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "", budgetAmount: "", entryData: [] };
  }

  getData = () =>{
      console.log("getdata")
    fetch("http://localhost:4000/budget", {
        method: "GET"
      })
        .then(res => res.json())
        .then(entries => {
          this.setState(() => ({
            entryData: entries
          }));
        })
        .catch(err => console.log("error", err)); 
  }
  componentDidMount() {
    this.getData()
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const id = e.target.id;
    const {entryData,...body} = this.state;
    if (this.state.category !== "" && this.state.budgetAmount !== "") {
      switch (id) {
        case "a":
            console.log("this",this)
          await fetch("http://localhost:4000/budget", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          }).then( () => this.setState({ category: "", budgetAmount: "" }))
          .then( () => {this.getData()});
          break;
        case "u":
          break;
        case "d":
          break;
        default:
          break;
      }
    }
  };

  render() {
    console.log("rendering")
    return (

      <>
        
        <form
          className="container animate"
        >
        <div className="flexButton">
          <label htmlFor="category">
            <b>Category</b>
          </label>
          <input
            type="text"
            placeholder="Enter Category"
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="budgetAmount">
            <b>Budget Amount</b>
          </label>
          <input
            type="text"
            placeholder="Enter Amount"
            name="budgetAmount"
            value={this.state.budgetAmount}
            onChange={this.handleChange}
            required
          />
          <div>
          <button id="a" onClick={this.handleSubmit} type="submit">
            Add
          </button>
          <button id="u" onClick={this.handleSubmit} type="submit">
            Update
          </button>
          <button id="d" onClick={this.handleSubmit} type="submit">
            Delete
          </button>
          </div>
          </div>
          <div className="budget"> 
          <BudgetList entryData={this.state.entryData}/>
          </div>  
        </form>
      </>
    );
  }
}

export default Budget;
