import React, { Component } from "react";
import "../styles/Budget.css";

class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entryData: [],
      budgetTotal: 0,
      budgetBalance: 0,
      actualTotal: 0,
      differenceTotal: 0
    };
  }

  getData = () => {
    fetch("http://localhost:4000/budget", {
      method: "GET"
    })
      .then(res => res.json())  //sort, total, map, setstate this.setState(() => ({entryData:  })
      .then(entries => entries.sort((a,b) => {
            if (a.category < b.category) {
              return -1
            }
            if (a.category > b.category) {
              return 1
            }           
          })
      )
      .then((sorted) => {
        let tempBudget = 0
        let tempBalance = 0
        let tempActual = 0
        let tempDifference = 0
        sorted.forEach(element => {
              tempBudget += parseFloat(element.budget)
              tempBalance += parseFloat(element.carryover)
              tempActual += parseFloat(element.amount)
              tempDifference += parseFloat(element.difference)
          })
          this.setState({
            budgetTotal: tempBudget,
            budgetBalance: tempBalance,
            actualTotal: tempActual,
            differenceTotal: eval(tempDifference).toFixed(2)
          })
          
          return(sorted)
        })
      .then((categories) => {
        return categories.map((category) => 
            (<div className="row">
              <div className="inputColumn4">
                <h3 className="inputLeftAlign">{category.category}</h3>
              </div>
              <div className="inputColumn4">
                <h3 className="inputTextColor">{category.budget}</h3>
              </div>
              <div className="inputColumn4">
                <h3 className="inputTextColor">{category.carryover}</h3>
              </div>
              <div className="inputColumn4">
                <h3 className="inputTextColor">{category.amount}</h3>
              </div>
              <div className="inputColumn4">
                <h3 className="inputTextColor">{category.difference}</h3>
              </div>
            </div>)
        )
      })
      .then(components => this.setState({ entryData: components }))
      .catch(err => console.log("error", err));
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <>
        <div className="setColor">
          <h1>FRIDLEY BUDGET</h1>
        </div>

        <div className="row">
          <div className="column">
            <h3 className="leftAlign">Summary</h3>
          </div>
          <div className="column">
            <h3 className="centerAlign">Budget</h3>
          </div>
          <div className="column">
            <h3 className="centerAlign">Actual</h3>
          </div>
          <div className="column">
            <h3 className="centerAlign">Difference</h3>
          </div>
        </div>

        <div className="row">
          <div className="inputColumn">
            <h3 className="inputLeftAlign">Income</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
        </div>

        <div className="row">
          <div className="inputColumn">
            <h3 className="inputLeftAlign">Expenses</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
        </div>

        <div className="row">
          <div className="inputColumn">
            <h3 className="inputLeftAlign">Balance</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
        </div>

        <div className="sectionHead">
          <h3>INCOME</h3>
        </div>

        <div className="row">
          <div className="inputColumn">
            <h3 className="inputLeftAlign">Income</h3>
          </div>
          <div className="inputColumn">
            <h3 className="headTextColor">Budget</h3>
          </div>
          <div className="inputColumn">
            <h3 className="headTextColor">Actual</h3>
          </div>
          <div className="inputColumn">
            <h3 className="headTextColor">Difference</h3>
          </div>
        </div>

        <div className="row">
          <div className="inputColumn">
            <h3 className="inputLeftAlign">Salary</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
        </div>
        <div className="row">
          <div className="inputColumn">
            <h3 className="inputLeftAlign">Miscellaneous</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
          <div className="inputColumn">
            <h3 className="inputTextColor">value</h3>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <h3 className="leftAlign">Total</h3>
          </div>
          <div className="column">
            <h3 className="centerAlign">value</h3>
          </div>
          <div className="column">
            <h3 className="centerAlign">value</h3>
          </div>
          <div className="column">
            <h3 className="centerAlign">value</h3>
          </div>
        </div>

        <div className="sectionHead">
          <h3>EXPENDITURE</h3>
        </div>
        <div className="row">
          <div className="inputColumn4">
            <h3 className="inputLeftAlign">Category</h3>
          </div>
          <div className="inputColumn4">
            <h3 className="headTextColor">Budget</h3>
          </div>
          <div className="inputColumn4">
            <h3 className="headTextColor">Carryover</h3>
          </div>
          <div className="inputColumn4">
            <h3 className="headTextColor">Expense</h3>
          </div>
          <div className="inputColumn4">
            <h3 className="headTextColor">Balance</h3>
          </div>
        </div>
        {this.state.entryData}
        <div className="row">
          <div className="column4">
            <h3 className="leftAlign">Total</h3>
          </div>
          <div className="column4">
            <h3 className="centerAlign">{this.state.budgetTotal}</h3>
          </div>
          <div className="column4">
            <h3 className="centerAlign">{this.state.budgetBalance}</h3>
          </div>
          <div className="column4">
            <h3 className="centerAlign">{this.state.actualTotal}</h3>
          </div>         
          <div className="column4">
            <h3 className="centerAlign">{this.state.differenceTotal}</h3>
          </div>
        </div>

        
      </>
    );
  }
}


export default Budget;
