import React from "react";
import { Link, Redirect } from "react-router-dom";


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "",
                   password: "",
                   redirect: false };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
 };

  handleSubmit = async event => {
    event.preventDefault();
    const { redirect, ...login }= this.state;
    const isLoggedIn = await this.props.login(login)
    if (!isLoggedIn) {
      alert("Invalid User, Try Again");
    }else{
      alert("Successfully Logged In");
      this.setState({ redirect: true });
    }
  };

  render() {
    const ifRedirect = this.state.redirect;
    return (
        <React.Fragment>
          {ifRedirect ? <Redirect to='/'/> :
        <>
        <form className="container animate" onSubmit={this.handleSubmit} >
          <label htmlFor="username">
            <b>Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div>
          Forgot Password? <Link to="/forgot">Click here</Link>
        </div>
        </>
          }
        </React.Fragment>

    );
  };
}

export default Login;
