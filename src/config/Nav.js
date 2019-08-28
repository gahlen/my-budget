import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = ({ login }) => {
  return (
    <nav className="navbar">
      <Link to = "/login">Login</Link>
      <Link to = "/">Ledger</Link>
      <Link to = "/">Register</Link>
      {/* <Link to="/auth">Register</Link> */}
      <Link to = "/report">Reports</Link>
      <Link to = "/category">Category Management</Link>
      <Link to = "/budget">Budget Summary</Link>
      <Link to = "/budgetManage">Budget Management</Link>

      <Link to = "/import">Import</Link>
    </nav>
  );
};

export default Nav;
