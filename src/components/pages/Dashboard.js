import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";
import Alert from "../layout/Alert";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  let history = useHistory();
  const {
    loadUser,
    getUnprocessedLoans,
    unprocessed,
    user,
    getUserLoans,
    userloans
  } = authContext;

  useEffect(() => {
    loadUser();
    getUnprocessedLoans()
    getUserLoans()
     // eslint-disable-next-line
  }, []);

  const Submit = (item) => (e) => {
    e.preventDefault()
    localStorage.setItem("loanid", item);
    history.push('/approve')
    // console.log(item);

  }

  return (
    <div>
      <h1>dashboard</h1>
      <Alert />
      {user && user.usertype === 1 && 
      <div className="">
          <h2 className="text-center">Unprocessed Loans</h2>
          {unprocessed !== null && (
              <section className="content-info overflow-auto">
              <table className="table table-striped table-bordered table-hover">
                <thead className="">
                  <tr>
                    <th className="text-center"> Loan No.</th>
                    <th className="text-center">Requested By</th>
                    <th className="text-center">Pay Through</th>
                    <th className="text-center">Due Date</th>
                    <th className="text-center">Amount Requested</th>
                    <th className="text-center">Process</th>
                    
                  </tr>
                </thead>
                <tbody className="text-center">
                  {unprocessed.map((option) => (
                    <tr key={option.loanid}>
                      <td>{option.loanid}</td>
                      <td>{option.requestedbyname}</td>
                      <td>{option.payavenuedescription}</td>
                      <td>{option.paymentdate}</td>
                      <td>{option.amountrequested}</td>
                      <td><button
                              className="btn btn-primary btn-sm"
                              onClick={Submit(option.loanid)}
                              type="button"
                            >
                              Process
                            </button></td>
                
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination-wrapper mt-6">
                <div>
        </div>
      </div>
            </section>
          )}
        </div>
    }

      {user && user.usertype === 2 && <div className="">
          <h2 className="text-center">My Loans</h2>
          {userloans !== null && (
              <section className="content-info overflow-auto">
              <table className="table table-striped table-bordered table-hover">
                <thead className="">
                  <tr>
                    <th className="text-center"> Loan No.</th>
                    <th className="text-center">Requested By</th>
                    <th className="text-center">Pay Through</th>
                    <th className="text-center">Due Date</th>
                    <th className="text-center">Amount Requested</th>
                    <th className="text-center">Status</th>
                    
                  </tr>
                </thead>
                <tbody className="text-center">
                  {userloans.map((option) => (
                    <tr key={option.loanid}>
                      <td>{option.loanid}</td>
                      <td>{option.requestedbyname}</td>
                      <td>{option.payavenuedescription}</td>
                      <td>{option.paymentdate}</td>
                      <td>{option.amountrequested}</td>
                      <td>
                          {option.approved===true&&(
                              <p className="text-success">Approved</p>
                          )}
                          {option.denied===true&&(
                              <p className="text-danger">Denied</p>
                          )}
                          {option.denied===null && option.approved===false&&(
                              <p className="">Pending</p>
                          )}
                      </td>
                
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination-wrapper mt-6">
                <div>
        </div>
      </div>
            </section>
          )}
        </div>}
    </div>
  );
};

export default Dashboard;
