import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import AlertContext from "../../context/alert/AlertContext";

const LoanApprove = () => {
    let loanid = localStorage.loanid
    const [visible, setVisible] = useState(false);
      const { register, handleSubmit, reset } = useForm();
      const [status, setStatus] = React.useState(0)
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
    approveLoan,
    denyLoan,
    denyloan,
    approveloan
  } = authContext;

  useEffect(() => {
    loadUser();
    getOneUnprocessedLoans(loanid)
    if(denyloan){
        setAlert(denyloan.message,'success')
        setVisible(false)
        clearErrors()
        localStorage.removeItem("loanid");
        history.push('/dashboard')
    }
    if(approveloan){
        setAlert(approveloan.message,'success')
        setVisible(false)
        clearErrors()
        localStorage.removeItem("loanid");
        history.push('/dashboard')
    }
    if(error){
        setVisible(false)
        clearErrors()
    }
     // eslint-disable-next-line
  }, [oneunprocessed,denyloan,approveloan]);

  const radioHandler = (status) => {
    setStatus(status);
  };

  if(oneunprocessed){
      console.log(oneunprocessed);
  }

  const onSubmit = (data,e) => {
    e.preventDefault();

    if(status===0){
        setAlert("Kindly check either deny or approve")
    }else{
        if(status===1){
            let amountdispatched = data.amountdispatched
            let approvalcomments = data.approvalcomments
            let loanid = localStorage.loanid
            approveLoan({loanid,approvalcomments,amountdispatched})
            setVisible(true)
        }
        if(status===2){
            let deniedreason = data.deniedreason
            let loanid = localStorage.loanid
            denyLoan({deniedreason,loanid})
            setVisible(true)
        }
    }
    
  };

//   console.log(status);

  return (
    <div className="card">
        <div className="p-5">
        <h2 className="text-center">Process Loan</h2>
<Alert />
{visible ? (
            <div>
              <h5 className="text-center">Posting...</h5>
              <Spinner />
            </div>
          ) : (
            <div></div>
          )}
{oneunprocessed && oneunprocessed !==null && <div className="">
          
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
                        <label htmlFor="email">Requested By</label>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                          value={oneunprocessed.requestedname}
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
                  </div>
                  <div className="row">
                  <div className="row">
                    <div className="col-lg-6">
                      <p>
                        <input
                        name="approve"
                          checked={status === 1} onClick={(e) => radioHandler(1)}
                          type="radio"
                        //   value="approve"
                        />{" "}
                        Approve
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <p>
                        <input
                        name="approve"
                         checked={status === 2} onClick={(e) => radioHandler(2)}
                          type="radio"
                        //   value="deny"
                        />{" "}
                        Deny
                      </p>
                    </div>
                  </div>
                  </div>
                  {status === 1 &&(
                  <div className="row">
                  <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="email">Amount To Allocate</label>
                        <input
                          type="number"
                          name="amountdispatched"
                          className="form-control"
                          {...register("amountdispatched", { required: true })}
                        //   value={oneunprocessed.loanid}
                          // onChange={onChange}
                          // required
                        //   disabled
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="email">Comments</label>
                        <textarea
                          type="text"
                          name="approvalcomments"
                          className="form-control"
                          {...register("approvalcomments", { required: true })}
                        //   value={oneunprocessed.loanid}
                          // onChange={onChange}
                          // required
                        //   disabled
                        />
                      </div>
                    </div>
                  </div>
                  )}
                  {status === 2 &&(
                  <div className="row">
                  <div className="col-lg-4">
                      <div className="form-group">
                        <label htmlFor="email">Denying Reason</label>
                        <textarea
                          type="text"
                          name="deniedreason"
                          className="form-control"
                          {...register("deniedreason", { required: true })}
                        //   value={oneunprocessed.loanid}
                          // onChange={onChange}
                          // required
                        //   disabled
                        />
                      </div>
                    </div>
                  </div>
                  )}
                  <div className="d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-primary btn-block">
              Finish Processing
            </button>
            </div>
                  </form>
    </div>}
    </div>

    </div>
    
  )
}

export default LoanApprove