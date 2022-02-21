import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import logo from "../../media/logo.jpg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { register, error, clearErrors, addedUser } = authContext;
  const { setAlert } = alertContext;
  const [visible, setVisible] = useState(false);
  const [phone1, setValue] = useState();

  useEffect(() => {
    if (addedUser) {
      console.log(addedUser.message);
      if (addedUser) {
        setVisible(false);
        setAlert(addedUser.message, "success");
        clearErrors();
        // return to default state
        setUser({
          first_name: "",
          last_name: "",
          email: "",
          passportno: "",
        });
        setValue();
        props.history.push("/");
      }
    }
    if (error) {
      setVisible(false);
      // eslint-disable-next-line array-callback-return
      Object.entries(error).map(([key, value]) => {
        // console.log(key,value);
        if (key === "email") {
          setAlert(value[0], "danger");
          clearErrors();
        }
        if (key === "password") {
          setAlert(value[0], "danger");
          clearErrors();
        }
      });
    }

    // console.log(error);
    // eslint-disable-next-line
  }, [error, addedUser]);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    passportno: "",
  });

  const { first_name, last_name, email, passportno } = user;

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      passportno === "" ||
      phone1 === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else {
      let phone = phone1;
      register({
        first_name,
        last_name,
        email,
        passportno,
        phone,
      });
      setVisible(true);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="auth-wrapperUs mt-5">
        <div className="auth-innerUs">
          <h1>
            Account <span className="text-primary">Register</span>
          </h1>
          <Alert />
          {visible ? (
            <div>
              <h5 className="text-center">Adding Account...</h5>
              <Spinner />
            </div>
          ) : (
            <div></div>
          )}
          <img
            src={logo}
            className=" rounded mx-auto d-block"
            style={{ height: "8em", width: "16em" }}
            alt=""
          />
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={first_name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                name="last_name"
                className="form-control"
                value={last_name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Phone Number</label>
              <PhoneInput
                country={"ke"}
                //   onlyCountries={['ke', 'tz', 'ug']}
                countryCodeEditable={false}
                value={phone1}
                onChange={setValue}
                inputClass="form-control"
                inputProps={{
                  name: "alternativephone",
                  required: true,
                  autoFocus: true,
                }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Passport No.</label>
              <input
                type="text"
                name="passportno"
                value={passportno}
                onChange={onChange}
                className="form-control"
                placeholder="Enter Passport No."
              />
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary mt-2 p-3"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
