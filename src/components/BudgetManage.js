import React, { Component } from "react";
import CustomModal from "../config/Modal";
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
      console.log("row selected+++++++++",this.state.selected,row.amount  )
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter(x => x !== row.refNumber)
      }));
    }
  };

  // getCategories = () => {
  //   fetch("http://localhost:4000/category", {
  //     method: "GET"
  //   })
  //     .then(res => res.json())
  //     .then(entries => {
  //       this.setState(() => ({
  //         categoryData: entries.sort((a,b) => {
  //           if (a.category < b.category) {
  //             return -1
  //           }
  //           if (a.category > b.category) {
  //             return 1
  //           }           
  //         })
  //       }));
  //     })
  //     .catch(err => console.log("error", err));
  // };

  getBankData = () => {
    fetch("http://localhost:4000/ledger", {
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
      mode: 'radio',
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      bgColor: "#def3ff"

    };
    // const selectRow = {
    //   mode: "checkbox",
    //   hideSelectColumn: false,
    //   clickToSelect: true,
    //   clickToEdit: true,
    //   selected: this.state.selected,
    //   onSelect: this.handleOnSelect,
    //   onSelectAll: this.handleOnSelectAll,
    //   bgColor: "#def3ff"
    // };

    const columns = [
      { text: "Post Date", dataField: "effectiveDate" },
      { text: "Reference Id", dataField: "refNumber" },
      { text: "Type", dataField: "type" },
      { text: "Description", dataField: "description" },
      { text: "Category",dataField: "category"},
      { text: "Amount", dataField: "amount" },
      { text: "Budgeted", dataField: "budgeted" }

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
        <button className="btn btn-success" onClick={this.handleImportBtnClick}>
          Import
        </button>
        <BootstrapTable 
          keyField="refNumber"
          data={this.state.entryData}
          columns={columns}
          selectRow={selectRow}
        />
        {/* <div>
        <div>{row.refNumber}</div>
        <div>{row.company}</div>
        <div>{leadData.applied_thru}</div>
        <CustomModal btnText="Update" title="Update Lead">
          <UpdateLead reload={reload} lead={leadData} />
        </CustomModal>
        <CustomModal btnText="Delete" title="Delete Lead">
          <DeleteLead reload={reload} id={leadData._id} />
        </CustomModal>
      </div> */}
      </div>
    );
  }
}
export default BudgetManage