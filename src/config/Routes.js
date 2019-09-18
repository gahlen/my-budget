import React from "react" 
import { Route } from "react-router-dom"
import Ledger from "../components/Ledger"
import Home from "../components/Home"
import Auth from "../pages/Auth"
import Login from "../components/Login"
import Category from "../components/Category"
import CategoryList from "../components/CategoryList"
import BudgetManage from "../components/BudgetManage"
import ResetPassword from "../components/ResetPassword"
import BudgetTrans from "../components/BudgetTrans";
import BudgetSummary from "../components/BudgetSummary"

const Routes = ({ addContact, login }) => {
  return (
    <>
      <Route path="/home" component={Home} />
      <Route path="/ledger" component={Ledger} />
      <Route path="/auth" component={() => <Auth addContact={addContact} login={login} />} />
      <Route path="/login" component={() => <Login login={login} />} />
      <Route path="/forgot" component={ResetPassword} />     
      <Route path="/category" component={Category} />
      <Route path="/categorylist" component={CategoryList} />
      <Route path="/budgetSummary" component={BudgetSummary} />
      <Route path="/budgetManage" component={BudgetManage} />
      <Route path="/budgetTrans" component={BudgetTrans} />
    </>
  );
};

export default Routes;
