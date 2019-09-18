import React, { Component } from "react";
import { BUDGET_API } from "../config/Coms";
import { Redirect } from "react-router-dom";

class BudgetTrans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [
        {
          description: this.props.location.state.description,
          category: this.props.location.state.category,
          amount: this.props.location.state.amount,
          refNumber: this.props.location.state.refNumber,
          processed: this.props.location.state.processed,
          postDate: this.props.location.state.postDate
        }
      ],
      categoryData: [],
      newRefNum: 0,
      amtBal: this.props.location.state.amount,
      redirect: false
    };
  }

  getData = () => {
    fetch(`${BUDGET_API}/category`, {
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

      .catch(err => console.log("error", err));
  };

  handleChange = (e, i) => {
    let list = [...this.state.transaction];
    list[i][e.target.name] = e.target.value;
    console.log("list",list)
    this.setState({ transaction: list });
    this.setState({ amtBal: list.reduce((acc, cur) =>  parseFloat(cur.amount) + acc,0)- this.props.location.state.amount})
  };

  handleDelete = async ref => {
    let newTrans = await this.state.transaction.filter(num => num.refNumber !== ref);
    this.setState({ transaction: newTrans });
    this.setState({ amtBal: this.state.transaction.reduce((acc, cur) =>  parseFloat(cur.amount) + acc,0)- this.props.location.state.amount})

  };

  handleSplit = event => {
    event.preventDefault();
    this.setState(prevState => ({
      transaction: [
        ...prevState.transaction,
        {
          description: "",
          category: "",
          amount: "",
          refNumber: `${this.props.location.state.refNumber}-${this.state.newRefNum}`,
          processed: "",
          postDate: this.props.location.state.postDate
        }
      ]
    }));
    this.setState({ newRefNum: (this.state.newRefNum += 1) });
  };

  handleUpdate = async event => {
    event.preventDefault();
    const newTrans = this.state.transaction.map(cur => Object.assign(cur,{processed:true}))
    this.setState({transaction:newTrans})
    console.log("put entries",newTrans)
    await fetch(`${BUDGET_API}/summary/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTrans)
    })
      .then(res => res.json())
      this.setState({ redirect: true });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const ifRedirect = this.state.redirect;

    return (
      <React.Fragment>
        {ifRedirect ? (
          <Redirect to="/BudgetManage"/>
        ) : (
          <>
            <form
              className="container animate flexCol"
              onSubmit={this.handleSubmit}
            >
              {this.state.transaction.map((trans, i) => (
                <div className="flexRow" key={i}>
                  <label className="descLabel" htmlFor="description">
                    <b>Ref #</b>
                  </label>
                  <input
                    className="inputSize"
                    type="refNum"
                    placeholder="refNumber"
                    name="refNumber"
                    value={trans.refNumber}
                    onChange={e => this.handleChange(e, i)}
                    required
                  />
                  <label className="descLabel" htmlFor="description">
                    <b>Description</b>
                  </label>
                  <input
                    className="inputSize"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={trans.description}
                    onChange={e => this.handleChange(e, i)}
                    required
                  />

                  <label className="descLabel" htmlFor="category">
                    <b>Category</b>
                  </label>
                  <select
                    className="inputSize"
                    name="category"
                    value={trans.category}
                    onChange={e => this.handleChange(e, i)}
                    required
                  >
                    {this.state.categoryData.map((cat, i) => (
                      <option key={i} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <label className="descLabel" htmlFor="amount">
                    <b>Amount</b>
                  </label>
                  <input
                    className="inputSize"
                    type="amount"
                    placeholder="amount"
                    name="amount"
                    value={trans.amount}
                    onChange={e => this.handleChange(e, i)}
                    required
                  />
                  <button className="btnDlt" onClick={() => this.handleDelete(trans.refNumber)}
                  > X </button>
                </div>
              ))}
              
              <output className="unCatAmt">Unsplit Amount - $ {eval(this.state.amtBal).toFixed(2)}</output>
          
              <button className="btnSize" onClick={this.handleSplit}>
                Split
              </button>

              <button className="btnSize" type="submit" onClick={this.handleUpdate}>
                Update
              </button>
            </form>
          </>
        )}
      </React.Fragment>
    );
  }
}
export default BudgetTrans;
