import React from "react"; 
import { Route } from "react-router-dom";
import Ledger from "../pages/Ledger";
import Auth from "../pages/Auth";
import Login from "../components/Login";
import Budget from "../components/Budget";
import BudgetList from "../components/BudgetList"
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
      <Route path="/budget" component={Budget} />
      <Route path="/budgetlist" component={BudgetList} />



    </>
  );
};

export default Routes;
