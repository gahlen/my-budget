import React, { Component } from "react";
import CategoryList from "./CategoryList";
import { LedgerContext } from "../context/LedgerContext";
import "../styles/Category.css";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      budgetAmount: "",
      entryData: [],
      budgetBalance: "",
      budgetTotal: 0,
      incomeTotal: 0
    };
  }
  
  getData = () => {
    fetch("http://localhost:4000/category", {
      method: "GET"
    })
      .then(res => res.json())
      .then(entries => {
        this.setState(() => ({
          entryData: entries.sort((a, b) => {
            if (a.category < b.category) {
              return -1;
            }
            if (a.category > b.category) {
              return 1;
            }
          })
        }));
      })
      .then(() => {
        this.state.entryData.forEach(element => {
          this.setState({
            budgetTotal: (this.state.budgetTotal += parseFloat(
              element.budgetAmount
            ))
          });
        });
      })

      .catch(err => console.log("error", err));
  };

  componentDidMount() {
    this.getData();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const id = e.target.id;
    //const body = [{category:this.state.category, budgetAmount:this.state.budgetAmount}]
    //let [{ category, budgetAmount, budgetBalance }] = this.state;
    if (this.state.category !== "" && this.state.budgetAmount !== "") {
      switch (id) {
        
        case "u":
          await fetch(
            `http://localhost:4000/category/${this.state.category}/${this.state.budgetAmount}/${this.state.budgetBalance}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" }
            }
          )
            .then(() =>
              this.setState({ category: "", budgetAmount: "", budgetBalance: "", budgetTotal: 0 })
            )
            .then(() => {
              this.getData();
            });
          break;
        case "d":
          await fetch(`http://localhost:4000/category/${this.state.category}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
          })
            .then(() =>
              this.setState({ category: "", budgetAmount: "", budgetBalance: "", budgetTotal: 0 })
            )
            .then(() => {
              this.getData();
            });
          break;
        default:
          break;
      }
    }
  };

  render() {
    return (
      <>
        <form className="container animate">
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
            />

            <label htmlFor="budgetBalance">
              <b>Budget Balance</b>
            </label>
            <input
              type="text"
              placeholder="Enter Balance"
              name="budgetBalance"
              value={this.state.budgetBalance}
              onChange={this.handleChange}
            />

            <div>
              <button id="u" onClick={this.handleSubmit} type="submit">
                Update
              </button>
              <button id="d" onClick={this.handleSubmit} type="submit">
                Delete
              </button>
            </div>
          </div>

          <div>
            <CategoryList entryData={this.state.entryData} />
          </div>

          <div className="leftCaptionSpacing">
            <h3 className="budgetCaption">Income</h3>
            <LedgerContext.Consumer>
              {({ contextData }) => <h3>{ contextData }</h3>}
            </LedgerContext.Consumer>
          </div>
          <div className="captionSpacing">
            <h3 className="budgetCaption">Budgeted</h3>{" "}
            <h3>{this.state.budgetTotal} </h3>
          </div>
          <div className="captionSpacing">
            <h3 className=" budgetCaption">Difference</h3>{" "}
            <LedgerContext.Consumer>
              {({ contextData }) => <h3>{eval(contextData - this.state.budgetTotal).toFixed(2)}</h3>}
            </LedgerContext.Consumer>
          </div>
        </form>
      </>
    );
  }
}

export default Category;
