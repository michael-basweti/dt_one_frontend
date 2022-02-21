import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import { useForm } from "react-hook-form";
import working from "../../media/working.svg"
import logo from "../../media/logo.jpg"
import loginsvg from "../../media/login.svg"
// import '../layout/Navbar.css'

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { register, handleSubmit } = useForm();

    const { login, error, clearErrors, isAuthenticated } = authContext;
    const { setAlert } = alertContext;

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/dashboard");
            setVisible(false);
          }
          if (error) {
            setAlert(error, "danger");
            setVisible(false);
            clearErrors();
          }
        // eslint-disable-next-line
      }, [error, isAuthenticated]);


    const LoginSubmit = (data, e) => {
        e.preventDefault();
        console.log(data.password,data.email);
        if(data.password===""||data.email===""){
            console.log("fill all");
        }else{
            let email = data.email
            let password = data.password
            login({ email, password });
            setVisible(true)
        }

    }
    return (
        <div>

            <div className="row justify-content-center align-items-center" style={{height:"100vh"}}>
                <div className="col-lg-2"></div>
            <div className="col-lg-4">
            
                <img src={working} className=" rounded mx-auto d-block img-fluid" alt="" />
                
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-4">
            <div className="">
            
              <div className="">
            <div className="mt-5">
        <div className="auth-innerUs">
        <img src={loginsvg} className=" rounded mx-auto d-block img-fluid" alt="" />
        <hr/>
                   <h1 className="text-primary text-center">Login</h1>
                   <Alert />
                   {visible ? (
            <div>
              <h5 className="text-center">Signing In...</h5>
              <Spinner />
            </div>
          ) : (
            <div></div>
          )}

<img src={logo} className=" rounded mx-auto d-block" style={{ height: "5em", width: "13em" }} alt="" />
          
                   <form onSubmit={handleSubmit(LoginSubmit)}>
                       <div className="form-group">
                       <label htmlFor="first_name">Email</label>
                       <input 
                       className="form-control" 
                       type="email" 
                       name="email"  
                       {...register("email", { required: true })}
                       />
                       </div>
                       <div className="form-group">
                       <label htmlFor="first_name">Password</label>
                       <input className=" form-control" 
                       type="password" 
                       name="password"
                       {...register("password", { required: true })}
                       />
                       </div>
                       <div className="form-group">
            <div className="custom-control custom-checkbox mt-3">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
                       <div className="d-grid gap-2 mt-3">
                       <button type="submit"  className="btn btn-primary btn-lg p-3" >Login</button>
                       </div>
                   </form>
                   
                   </div>
               </div>
               </div>
               </div>
               </div>
               <div className="col-lg-1"></div>
               </div>
                </div>
               
            
    )
}

export default Login
