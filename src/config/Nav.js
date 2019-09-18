import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = ({ login }) => {
  return (
    <nav className="navbar">
      <Link className= "left-align" to = "/home">Home</Link>
      <Link className= "left-align" to = "/ledger">Ledger</Link>
      <Link className= "left-align" to = "/category">Category Management</Link>
      <Link className= "left-align" to = "/budgetSummary">Budget Summary</Link>
      <Link className= "left-align" to = "/budgetManage">Budget Management</Link>
      <Link className= "left-align" to = "/report">Reports</Link>
      <Link className= "right-align" to = "/auth">Register</Link> 
      <Link className= "right-align" to = "/login">Login</Link>
    </nav>
  );
};

export default Nav;
