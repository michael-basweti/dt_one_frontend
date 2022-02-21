import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";

const PassChange = () => {
    const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const {
    error,
    clearErrors,
    isAuthenticated,
    passChange,
    pass_change,
  } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    authContext.loadUser();
    if (pass_change) {
      setVisible(false);
      setAlert(pass_change.message, "success");
      clearErrors();
      console.log(pass_change.message);
      setPassword({
        old_password: "",
        password: "",
        password1: "",
      });
    }
    if (error) {
      setVisible(false);
      setAlert(error.real_message, "danger");
      clearErrors();
    }

    // console.log(error);
    // eslint-disable-next-line
  }, [error, isAuthenticated, pass_change]);
  const [visible, setVisible] = useState(false);
  const [passwordset, setPassword] = useState({
    old_password: "",
    password: "",
    password1: "",
  });

  const { password, password1, old_password } = passwordset;

  const onSubmit = (e) => {
    e.preventDefault();
    if (old_password === "" || password1 === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password1) {
      setAlert("Passwords do not match", "danger");
    } else {
      passChange({
        password1,
        password,
        old_password,
      });
      setVisible(true);
    }
  };

  const onChange = (e) => {
    setPassword({ ...passwordset, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="auth-wrapperUs">
        <div className="auth-innerUs"> 
          <h1>
            Password <span className="text-primary">Change</span>
          </h1>
          <Alert />
          {visible ? (
            <div>
              <h5 className="text-center">Updating password...</h5>
              <Spinner />
            </div>
          ) : (
            <div></div>
          )}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="password">Old Password</label>
              <input
                type="password"
                minLength="8"
                className="form-control"
                name="old_password"
                value={old_password}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                minLength="8"
                className="form-control"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password2">Password Confirm</label>
              <input
                type="password"
                className="form-control"
                minLength="8"
                name="password1"
                value={password1}
                onChange={onChange}
                required
              />
            </div>
            <div class="d-flex justify-content-center mt-2">
            <input
              type="submit"
              value="Register"
              className="btn btn-primary btn-block"
            />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PassChange
