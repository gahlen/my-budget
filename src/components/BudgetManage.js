import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { LedgerContext } from "../context/LedgerContext";

class BudgetManage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected:[],
      entryData:[],
      categoryData:[],
      incomeData:[]
    };
  }

  getData = () => {
    fetch("http://localhost:4000/category", {
      method: "GET"
    })
      .then(res => res.json())
      .then(entries => {
        this.setState(() => ({
          categoryData: entries.sort((a, b) => {
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
        this.state.categoryData.forEach(element => {
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

    getIncome = () => {
    let totalIncome = 0
    this.state.entryData.forEach(element => {
      if (element.type === "Credit") {
        totalIncome += parseFloat(element.amount)
      }
  })
    return totalIncome
  }
  

  handleBtnClick = (dataTransfer) => {
    let reference = this.state.selected;
    let putData = this.state.entryData.filter(data =>
      reference.includes(data.refNumber)
    );
    fetch("http://localhost:4000/summary/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putData)
    })
      .then(res => res.json())
      .then(this.getIncome)
      .then(income => dataTransfer(income))        
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.refNumber]
      }));
      console.log("row selected+++++++++",this.state.selected,row.refNumber  )
      this.props.history.push({
        pathname:"/budgetTrans",
        state:{
            desc: row.description,
            ref: row.refNumber,
            amt: row.amount,
            cat: row.category,
            type: row.type
         }
       });
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter(x => x !== row.refNumber)
      }));
    }
  };

  getCategories = () => {
    fetch("http://localhost:4000/category", {
      method: "GET"
    })
      .then(res => res.json())
      .then(entries => {
        this.setState(() => ({
          categoryData: entries.sort((a,b) => {
            if (a.category < b.category) {
              return -1
            }
            if (a.category > b.category) {
              return 1
            }           
          })
        }));
      })
      .catch(err => console.log("error", err));
  };

  getBankData = () => {
    fetch("http://localhost:4000/summary", {
      method: "GET"
    })
      .then(res => res.json())
      .then(entries => {
        this.setState(() => ({
          entryData: entries
        }));
      })
      .catch(err => console.log("error", err));
  };

  componentDidMount() {
    this.getBankData();
    this.getCategories();
  }
  
  render() {
    const selectRow = {
      hideSelectColumn: true,
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
      bgColor: "#def3ff"
    };

    const columns = [
      { text: "Reference Id", dataField: "refNumber" },
      { text: "Type", dataField: "type" },
      { text: "Post Date", dataField: "postDate" },
      { text: "Description", dataField: "description" },
      { text: "Category", dataField: "category" },
      { text: "Amount", dataField: "amount" },
      { text: "Budgeted", dataField: "budgeted" },
      { text: "Split", dataField: "split" }
    ]; 

    return (
      <div>
        <LedgerContext.Consumer>
        {({ dataTransfer }) => (
        <button className="btn btn-success" onClick={() => this.handleBtnClick(dataTransfer)}>
          Update
        </button>
        )}
        </LedgerContext.Consumer>
        
        <BootstrapTable 
          keyField="refNumber"
          data={this.state.entryData}
          columns={columns}
          selectRow={selectRow}
        />
      </div>
    );
  }
}
export default BudgetManage