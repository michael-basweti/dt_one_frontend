import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const {
    error,
    clearErrors,
    loadUser,
    getUnprocessedLoans,
    unprocessed,
    user,
  } = authContext;

  useEffect(() => {
    loadUser();
    getUnprocessedLoans()
     // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>dashboard</h1>
      {user && user.usertype === 1 && 
      <div className="">
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
          client
    </div>}
    </div>
  );
};

export default Dashboard;
