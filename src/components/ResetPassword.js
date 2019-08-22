import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class extends Component {
  state = {
    email: "",
    emailConfirm: "",
    redirect: false
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.email !== this.state.emailConfirm) {
      alert("Emails don't match");
      return;
    }
    const { email } = this.state;
    alert(`Reset Link sent to ${email}`);
    this.setState({ redirect: true });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const title = "Reset Password";
    const willRedirect = this.state.redirect;
    return (
      <>
        {willRedirect ? (<Redirect to="/" />) : 
        (
            <form className="container animate" onSubmit={this.handleSubmit}>
              <label htmlFor="email">
              <b>Email</b>
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="confirmEmail">
              <b>Confirm Email</b>
                </label>
              <input
                type="email"
                placeholder="Confirm Email"
                name="emailConfirm"
                onChange={this.handleChange}
                required
              />
              <button type="submit">{title}</button>
            </form>
        )}
      </>
    );
  }
}
