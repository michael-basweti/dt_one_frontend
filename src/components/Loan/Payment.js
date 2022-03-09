import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import AlertContext from "../../context/alert/AlertContext";

const Payment = () => {
  let loanid = localStorage.loanid_pay;
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [status, setStatus] = React.useState(0);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  let history = useHistory();
  const { setAlert } = alertContext;
  const {
    error,
    clearErrors,
    loadUser,
    getOneUnprocessedLoans,
    oneunprocessed,
    makePayment,
    makepayment
  } = authContext;

  useEffect(() => {
    loadUser();
    getOneUnprocessedLoans(loanid);
    if (makepayment) {
      setAlert(makepayment.message, "success");
      setVisible(false);
      clearErrors();
      reset()
      localStorage.removeItem("loanid_pay");
      history.push("/dashboard");
    }
    if (error) {
      setVisible(false);
      setAlert(error.message,'danger')
      clearErrors();
    }
    // eslint-disable-next-line
  }, [oneunprocessed, makepayment, error,reset]);




  const onSubmit = (data, e) => {
    e.preventDefault();


        let amount = data.amount;
        let loanid = localStorage.loanid_pay;
        makePayment({ loanid, amount });
        setVisible(true);
     
    
  };
  return (
    <div className="card">
      <div className="p-5">
        <h2 className="text-center">Make Payment</h2>
        <Alert />
        {visible ? (
          <div>
            <h5 className="text-center">Posting Payment...</h5>
            <Spinner />
          </div>
        ) : (
          <div></div>
        )}
        {oneunprocessed && oneunprocessed !== null && (
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Loan Id.</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={oneunprocessed.loanid}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Due Date</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={oneunprocessed.paymentdate}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Pay Through</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={oneunprocessed.payavenuedescription}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Amount Requested</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={oneunprocessed.amountrequested}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Amount Dispatched</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={oneunprocessed.amountdispatched}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Amount Paid</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      value={oneunprocessed.real_amount_paid}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Amount To Pay</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control text-danger"
                      value={oneunprocessed.remainingamount}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4"></div>
              </div>
              <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="email">Reason</label>
                    <textarea
                      type="text"
                      name="email"
                      className="form-control"
                      value={oneunprocessed.description}
                      // onChange={onChange}
                      // required
                      disabled
                    />
                  </div>
                </div>
                <div className="col-lg-4"></div>
              </div>
              <div className="row">
              <div className="col-lg-4"></div>
              <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="email">Amount To Pay</label>
                        <input
                          type="number"
                          name="amountdispatched"
                          className="form-control"
                          {...register("amount", { required: true })}
                        //   value={oneunprocessed.loanid}
                          // onChange={onChange}
                          // required
                        //   disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-4"></div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <button type="submit" className="btn btn-primary btn-block">
                  Make Payment
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
