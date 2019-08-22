import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
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

// const cellEdit = {
//   mode: "click"
// };
const Ledger = () => {
  const [entryData, setEntryData] = useState([]);
  const [selectData, setSelectData] = useState([]);

  const handleBtnClick = () => {
    
  };

  const handleOnSelect = (row, isSelect) => {
    console.log(row,isSelect)
    if (isSelect) {
      setSelectData(
        [...selectData, row]
      );
      console.log("39",selectData)
    } else {
      setSelectData(() => (
        selectData.filter(x => x !== row.id)
      ));
    }
  };
  const handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      setSelectData(() => (
        ids
      ));
    } else {
      setSelectData(() => (
        []
      ));
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/", {
      method: "GET"
    })
      .then(res => res.json())
      .then(entries => {
        setEntryData(entries);
      })
      .catch(err => console.log("error", err));
  }, []);

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    selected: selectData,
    onSelect: (a,checked,row) => handleOnSelect(row,checked),
    onSelectAll: handleOnSelectAll
  };
  console.log("prior to return",selectData)
  return (
    <div>
      <button className="btn btn-success" onClick={ handleBtnClick }>Update</button>

      <BootstrapTable
        keyField="refNumber"
        data={entryData}
        columns={columns}
        selectRow={selectRow}
        cellEdit={cellEditFactory({ mode: "click" })}
      />
    </div>
  );
};

export default Ledger;
