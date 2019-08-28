import React from "react"; 
import { Route } from "react-router-dom";
import Ledger from "../pages/Ledger";
import Auth from "../pages/Auth";
import Login from "../components/Login";
import Category from "../components/Category";
import CategoryList from "../components/CategoryList"
import Budget from "../components/Budget"

import ResetPassword from "../components/ResetPassword";

const Routes = ({ addContact, login }) => {
  return (
    <>
      <Route
        exact
        path="/"
        component={() => <Ledger />}
      />
      <Route
        path="/auth"
        component={() => <Auth addContact={addContact} login={login} />}
      />
      <Route path="/login" component={() => <Login login={login} />} />
      <Route path="/forgot" component={ResetPassword} />     
      <Route path="/category" component={Category} />
      <Route path="/categorylist" component={CategoryList} />
      <Route path="/budget" component={Budget} />




    </>
  );
};

export default Routes;
