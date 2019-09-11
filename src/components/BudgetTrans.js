import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class BudgetTrans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: [
        {
          desc: this.props.location.state.desc,
          cat: this.props.location.state.cat,
          amt: this.props.location.state.amt,
          ref: this.props.location.state.ref
        }
      ],
      categoryData: [],
      newRefNum: 0,
      showing: false,
      amtBal: 0,
      checked: false,
      redirect: false
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

  handleChange = (e, i) => {
    let list = [...this.state.transaction];
    list[i][e.target.name] = e.target.value;
    this.setState({ transaction: list });
    this.setState({amtBal: list.reduce((acc, cur) => acc + parseFloat(cur.amt),0)})
  };

  handleDelete = async ref => {
    let newTrans = await this.state.transaction.filter(num => num.ref != ref);
    this.setState({ transaction: newTrans });
  };

  handleSplit = event => {
    event.preventDefault();
    this.setState(prevState => ({
      transaction: [
        ...prevState.transaction,
        {
          desc: "",
          cat: "",
          amt: "",
          ref: `${this.props.location.state.ref}-${this.state.newRefNum}`
        }
      ]
    }));
    this.setState({ newRefNum: (this.state.newRefNum += 1) });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ redirect: true });
  };

  render() {
    const ifRedirect = this.state.redirect;
    const { showing } = this.state;

    return (
      <React.Fragment>
        {ifRedirect ? (
          <Redirect to="/BudgetManage" />
        ) : (
          <>
            <form
              className="container animate flexCol"
              onSubmit={this.handleSubmit}
            >
              {this.state.transaction.map((trans, i) => (
                <div className="flexRow" key={i}>
                  <label htmlFor="description">
                    <b>Ref Number</b>
                  </label>
                  <input
                    className="inputSize"
                    type="refNum"
                    placeholder="refNumber"
                    name="refNumber"
                    value={trans.ref}
                    onChange={e => this.handleChange(e, i)}
                    required
                  />
                  <label htmlFor="description">
                    <b>Description</b>
                  </label>
                  <input
                    className="inputSize"
                    type="desc"
                    placeholder="Description"
                    name="desc"
                    value={trans.desc}
                    onChange={e => this.handleChange(e, i)}
                    required
                  />

                  <label htmlFor="category">
                    <b>Category</b>
                  </label>
                  <select
                    className="inputSize"
                    name="cat"
                    value={trans.cat}
                    onChange={e => this.handleChange(e, i)}
                    required
                  >
                    {this.state.categoryData.map((cat, i) => (
                      <option key={i} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="amount">
                    <b>Amount</b>
                  </label>
                  <input
                    className="inputSize"
                    type="amount"
                    placeholder="amount"
                    name="amt"
                    value={trans.amt}
                    onChange={e => this.handleChange(e, i)}
                    required
                  />
                  <button
                    className="btnDlt"
                    onClick={() => this.handleDelete(trans.ref)}
                  >
                    X
                  </button>
                </div>
              ))}
              
              <output className="unCatAmt">Uncatagorized Amount - $ {this.state.amtBal}</output>
            

              <button className="btnSize" onClick={this.handleSplit}>
                Split
              </button>

              <button className="btnSize" type="submit">
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
