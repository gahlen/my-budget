import React from "react";
import {Redirect} from 'react-router-dom'

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstname: "", lastname: "", email: "",
                   phone: "", age: "", password: "",
                   confirmPassword : "", redirect: false};
  }
  
  handleSubmit = event => {
    event.preventDefault();
    if(this.state.password !== this.state.confirmPassword){
      alert("Passwords don't match")
      return
    }
    const { confirmPassword, redirect, ...contact } = this.state;
    if(!this.props.addContact(contact)){
      alert('Invalid User, Try Again')
    }else {
      alert("User Created!");
      this.setState({redirect:true})
    } 
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {

    const ifRedirect = this.state.redirect;

    return (
        <React.Fragment>
          {ifRedirect ? <Redirect to='/'/> :

          <form className="container animate" onSubmit={this.handleSubmit}>
            <label htmlFor="firstname">
              <b>First Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="lastname">
              <b>Last Name</b>
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="phone">
              <b>Phone</b>
            </label>
            <input
              type="text"
              placeholder="Enter Phone"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="age">
              <b>Age</b>
            </label>
            <input
              type="text"
              placeholder="Enter Your Age"
              name="age"
              value={this.state.age}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter  Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />

            <label htmlFor="confirmPassword">
              <b>Confirm Password</b>
            </label>
            <input
              type="password"
              placeholder="Re-Enter Password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>
          }
      </React.Fragment>

    );
  }
}

export default Register;
