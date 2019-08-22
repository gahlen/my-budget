import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

const columns = [
  { text: "Post Date", dataField: "effectiveDate" },
  { text: "Type", dataField: "type" },
  { text: "Reference Id", dataField: "refNumber" },
  { text: "Description", dataField: "description" },
  { text: "Category", dataField: "category" },
  { text: "Amount", dataField: "amount" },
  { text: "Balance", dataField: "balance" }
];
// const selectRow = {
//   mode: "checkbox",
//   clickToSelect: true,
//   clickToEdit: true // Click to edit cell also
// };


class Ledger extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: [],
                   entryData: [],
                   selectData: [] };
  }
  

  handleBtnClick = (e) => {
    e.preventDefault()
    console.log("state data",this.state.entryData)
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

  componentDidMount() {
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
      bgColor: '#def3ff'

    };

    const cellEdit = cellEditFactory({ 
      mode: 'click', 
      blurToSave: true, 
     })

    return (
      <div>
        <button className="btn btn-success" onClick={this.handleBtnClick}>
          Update
        </button>

        <BootstrapTable
          keyField="refNumber"
          data={this.state.entryData}
          columns={columns}
          selectRow={selectRow}
          cellEdit={ cellEdit }
        />
      </div>
    );
  }
}
export default Ledger