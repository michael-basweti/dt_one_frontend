import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import Alert from "../layout/Alert";
import DatePicker from "react-datepicker";
import Spinner from "../layout/Spinner";

const Reports = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  let startdate = startDate.toLocaleDateString('en-CA')
  let enddate = endDate.toLocaleDateString('en-CA')
  const { setAlert } = alertContext;
  const {
    error,
    clearErrors,
    loadUser,
    getUnpaidLoans,
    getunpaidloans,
    getLoansDueExcel,
    getloansdueexcel
  } = authContext;

  useEffect(() => {
    loadUser();
    getUnpaidLoans(startdate,enddate);
    if (getloansdueexcel) {
      setVisible(false);
      clearErrors();
    }
    if (error) {
      setVisible(false);
      setAlert(error.message,'danger')
      clearErrors();
    }
    // eslint-disable-next-line
  }, [getunpaidloans, error, getloansdueexcel]);

  const get_excel = () => {
    // e.preventDefault()
    getLoansDueExcel(startdate,enddate)
    setVisible(true)
  }
  return (
    <div>
      <Alert />
      {visible ? (
          <div>
            {/* <h5 className="text-center">Posting Payment...</h5> */}
            <Spinner />
          </div>
        ) : (
          <div></div>
        )}
      <h1 className="text-center">Unpaid Loan Reports</h1>
      <h5 className="text-center">Filter By Date</h5>
      <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-2">
            
              <div className="form-group">
                <label>Start Date</label>
                <DatePicker
                className="form-control"
                  dateFormat="yyyy-MM-dd"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  inline
                />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="form-group">
                <label>End Date</label>
                <DatePicker
                className="form-control"
                  dateFormat="yyyy-MM-dd"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  inline
                />
              </div>
            </div>
            <div className="col-lg-5">
            <div className="d-flex justify-content-center mt-2 p-5">
                <button type="button" className="btn btn-primary btn-block" onClick={get_excel}>
                  Download To Excel
                </button>
              </div>

              <div className="d-flex justify-content-center mt-2 p-5">
                <button type="button" className="btn btn-primary btn-block">
                  Trigger Email
                </button>
              </div>
            </div>
          </div>
          <div className="">
          <h2 className="text-center">Loans Due</h2>
          {getunpaidloans !== null && (
              <section className="content-info overflow-auto">
              <table className="table table-striped table-bordered table-hover">
                <thead className="">
                  <tr>
                    <th className="text-center"> Loan No.</th>
                    <th className="text-center">Requested By</th>
                    <th className="text-center">Pay Through</th>
                    <th className="text-center">Due Date</th>
                    <th className="text-center">Amount Dispatched</th>
                    <th className="text-center">Amount Paid</th>
                    <th className="text-center">Amount Remaining</th>
                    <th className="text-center">Email</th>
                    <th className="text-center">Phone</th>
                    {/* <th className="text-center">Process</th> */}
                    
                  </tr>
                </thead>
                <tbody className="text-center">
                  {getunpaidloans.map((option) => (
                    <tr key={option.loanid}>
                      <td>{option.loanid}</td>
                      <td>{option.requestedname}</td>
                      <td>{option.payavenuedescription}</td>
                      <td>{option.paymentdate}</td>
                      <td>{option.amountdispatched}</td>
                      <td>{option.real_amount_paid}</td>
                      <td>{option.remainingamount}</td>
                      <td>{option.email}</td>
                      <td>{option.phone}</td>
                      {/* <td><button
                              className="btn btn-primary btn-sm"
                              onClick={Submit(option.loanid)}
                              type="button"
                            >
                              Process
                            </button></td> */}
                
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
      </div>
  )
}

export default Reports