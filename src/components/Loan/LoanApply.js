import React, { useContext, useEffect, useState} from 'react'
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import { useForm } from "react-hook-form";
import { Typeahead } from "react-bootstrap-typeahead";
import DatePicker from "react-datepicker";

const LoanApply = () => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;

    const {
        error,
        clearErrors,
        getPayVenues,
        getpayavenues,
        ApplyLoan,
        applyloan
      } = authContext;
  
      const [visible, setVisible] = useState(false);
      const { register, handleSubmit, reset } = useForm();
      const [singleSelections, setSingleSelections] = useState([]);
      const [payDate, setPayDate] = useState(new Date());
      useEffect(()=>{
        getPayVenues()
        if (applyloan) {
              setAlert(applyloan.message, "success");
              clearErrors();
              setSingleSelections([])
              setVisible(false);
              setPayDate(new Date())
              reset()
          }

          if(error){
              setVisible(false)
          }

        
        // eslint-disable-next-line
    },[ reset,applyloan,error])

    let loadedavenues = []
    if(getpayavenues){
        loadedavenues=getpayavenues
    }else{
        loadedavenues=[]
    }

    const onSubmit = (data,e) => {
        e.preventDefault();
        let amountrequested = data.amountrequested
        let description = data.description
        if(singleSelections){
        if (amountrequested === "" || description === "" ) {
          setAlert("Please fill all field", "danger");
        } else {
            let paymentdate = payDate.toLocaleDateString('en-CA')
            let payavenue = singleSelections[0].payavenueid
            console.log(amountrequested,paymentdate,payavenue,description);
            ApplyLoan({amountrequested,description,payavenue,paymentdate});
            setVisible(true);
        }}else{
            setAlert("Please Select payment Avenue", "danger");
        }
      };
  return (
    <div >
        <div className="auth-wrapperUs mt-5">
        <div className="auth-innerUs">
              <Alert />
          {visible ? (
            <div>
              <h5 className="text-center">Posting...</h5>
              <Spinner />
            </div>
          ) : (
            <div></div>
          )}
              <form onSubmit={handleSubmit(onSubmit)}>
              
              <div className="form-group">
              <label>Enter Amount To Borrow</label>
              <input
                      type="number"
                      name="amount"
                      // value={customername}
                      // onChange={onChange}
                      {...register("amountrequested", { required: true })}
                      className="form-control"
                      placeholder="Enter Amount"
                    />
                    </div>
                    <div className="form-group mt-3">
              <label>Description</label>
              <textarea
                      type="text"
                      name="mpesacode"
                      // value={customername}
                      // onChange={onChange}
                      {...register("description", { required: true })}
                      className="form-control"
                      placeholder="Description, what's the loan for?"
                    />
                    </div>
                    <div className="form-group mt-3">
                    <label>Dispatch Avenue</label>
              {loadedavenues.length !== 0 && (
                <Typeahead
                  id="basic-typeahead-single"
                  labelKey="payavenuedescription"
                  onChange={setSingleSelections}
                  options={loadedavenues}
                  placeholder="Select Dispatch Avenue"
                  selected={singleSelections}
                //   size="lg"
                  inputProps={{ required: true }}
                />
              )}
            </div>
            <div className="form-group">
                            <label className="text-center d-flex justify-content-center">Expected Payment Date</label>
                            <div className="d-flex justify-content-center">
                            <DatePicker className="form-control"
                  dateFormat="yyyy-MM-dd" selected={payDate} onChange={(date) => setPayDate(date)} required minDate={new Date()} inline/>
                  </div>
                          </div>
            <div className="d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-primary btn-block">
              Apply For Loan
            </button>
            </div>
                    </form>
                    </div>
                    </div>
          </div>
  )
}

export default LoanApply