import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/AuthContext";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import { Fragment } from "react";
import Login from "./Auth/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./layout/Navbar";
import PrivateRoute from "../routing/PrivateRoute";
import PassChange from "./Auth/PassChange";
import Register from "./Auth/Register";
import LoanApply from "./Loan/LoanApply";
import Reports from "./Loan/Reports";
import LoanApprove from "./Loan/LoanApprove";

const RouteComponent = () => {
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Fragment>
            <Navbar />
            {user && (
            <div className="">
              <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-9 shadow-sm p-3 mb-5  mt-5">
                <Fragment>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/loan" component={LoanApply} />
            <PrivateRoute exact path="/reports" component={Reports} />
            <PrivateRoute exact path="/approve" component={LoanApprove} />
            <PrivateRoute exact path="/pass_change" component={PassChange} />
            </Fragment>
                </div>
                <div className="col-lg-1"></div>
              </div>
                
            </div>
            )}
            </Fragment>
            
          </Switch>
        </Fragment>
      </Router>
    </div>
  );
};

export default RouteComponent;
