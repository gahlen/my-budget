import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { BUDGET_API } from "../config/Coms";
import { LedgerContext } from "../context/LedgerContext";

class Ledger extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: [],
      entryData: [],
      categoryData: [],
      incomeData: []
    };
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
  

  handleUpdate = (dataTransfer) => {
    let reference = this.state.selected;
    let putData = this.state.entryData.filter(data =>
      reference.includes(data.refNumber)
    );
    console.log("put entries",putData)
    fetch(`${BUDGET_API}/summary/`, {
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
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter(x => x !== row.refNumber)
      }));
    }
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.refNumber);
    if (isSelect) {
      this.setState(() => ({
        selected: ids
      }));
    } else {
      this.setState(() => ({
        selected: []
      }));
    }
  };

  getBankData = () => {
    fetch(`${BUDGET_API}/ledger`, {
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
      this.getBankData()
  }
  
  render() {
    const selectRow = {
      mode: "checkbox",
      hideSelectColumn: false,
      clickToSelect: true,
      clickToEdit: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
      bgColor: "#def3ff"
    };

    const columns = [
      { text: "Post Date", dataField: "postDate" },
      { text: "Reference Id", dataField: "refNumber" },
      { text: "Type", dataField: "type" },
      { text: "Description", dataField: "description" },
      { text: "Category",dataField: "category"},
      { text: "Amount", dataField: "amount" },
      { text: "Balance", dataField: "balance" }
    ];

    return (
      <div>
        <LedgerContext.Consumer>
        {({ dataTransfer }) => (
        <button className="btn btn-success" onClick={() => this.handleUpdate(dataTransfer)}>
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
export default Ledger