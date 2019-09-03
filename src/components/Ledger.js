import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

class Ledger extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: [],
      entryData: [],
      selectData: [],
      categoryData: []
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
  

  handleBtnClick = e => {
    e.preventDefault();
    let reference = this.state.selected;
    let putData = this.state.entryData.filter(data =>
      reference.includes(data.refNumber)
    );
    fetch("http://localhost:4000/ledger/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(putData)
    })
      .then(res => res.json())
      .then(console.log);
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
    fetch("http://localhost:4000/", {
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
      { text: "Post Date", dataField: "effectiveDate" },
      { text: "Reference Id", dataField: "refNumber" },
      { text: "Type", dataField: "type" },
      { text: "Description", dataField: "description" },
      { text: "Category",dataField: "category",
        editor: {
          type: Type.SELECT,
          getOptions: (setOptions, { row, column }) => {
            return this.state.categoryData.map(category => ({
              value: category.category,
              label: category.category
            }));
          }
        }
      },
      { text: "Amount", dataField: "amount" },
      { text: "Balance", dataField: "balance" }
    ];

    const cellEdit = cellEditFactory({
      mode: "click",
      blurToSave: true
    });

    return (
      <div>
        <button className="btn btn-success" onClick={this.handleBtnClick}>
          Update
        </button>

        <BootstrapTable
          keyField="refNumber"
          data={this.state.entryData}
          columns={columns}
          cellEdit={cellEdit}
          selectRow={selectRow}
        />
      </div>
    );
  }
}
export default Ledger