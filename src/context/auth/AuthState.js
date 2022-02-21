import React, { useReducer } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {

  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  PASS_CHANGE,
  PASS_CHANGE_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PAYAVENUES,
  PAYAVENUES_ERROR,
  APPLY_LOAN,
  APPLY_LOAN_ERROR
  
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
    pass_change:null,
    getpayavenues:null,
    applyloan:null
  };

  const server_url = process.env.REACT_APP_SERVER_DOMAIN;

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      if (localStorage.token) {
        dispatch({
          type: USER_LOADED,
          payload: JSON.parse(localStorage.getItem("userLogged")),
        });
      }
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  const register = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server_url}auth/register`,
        formData,
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
      // loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
      console.log(err.response.data)
    }
  };

  const login = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // console.log(server_url);
      const res = await axios.post(`${server_url}auth/login`, formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      localStorage.setItem("userLogged", JSON.stringify(res.data.user));
    //   localStorage.setItem("usertype", res.data.user.iscustomer);
      loadUser();
      console.log(res.data);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.detail,
      });
      console.log(err.response.data.detail)
    }
  };

  
  const logout = () => {
    dispatch({ type: LOGOUT });
  };
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };


   // pass change 
   const passChange = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      // console.log(server_url);
      const res = await axios.put(`${server_url}auth/update_password`, formData, config);
      dispatch({
        type: PASS_CHANGE,
        payload: res.data,
      });
      localStorage.setItem("userLogged", JSON.stringify(res.data.user));
    //   localStorage.setItem("usertype", res.data.user.iscustomer);
      loadUser();
      console.log(res.data.token);
    //   console.log(res.data.user.iscustomer);
    } catch (err) {
      dispatch({
        type: PASS_CHANGE_ERROR,
        payload: err.response.data,
      });
      // console.log(err.response.data.detail)
    }
  };


  // Get Pickup package
  const getPayVenues = async () => {
    try {
      const res = await axios.get(`${server_url}loan/payavenues`);
      dispatch({
        type: PAYAVENUES,
        payload: res.data,
      });
      // console.log(res.data);
    } catch (err) {
      dispatch({
        type: PAYAVENUES_ERROR,
        payload: err.response.data,
      });
      // console.log(err.response.data);
    }
  };


  const ApplyLoan = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server_url}loan/request`,
        formData,
        config
      );
      dispatch({
        type: APPLY_LOAN,
        payload: res.data,
      });
      console.log(res.data);
      // loadUser()
    } catch (err) {
      dispatch({
        type: APPLY_LOAN_ERROR,
        payload: err.response.data,
      });
      console.log(err.response.data)
    }
  };




  return (
    <AuthContext.Provider
      value={{
        ...state,
        loadUser,
        login,
        logout,
        clearErrors,
        passChange,
        register,
        getPayVenues,
        ApplyLoan
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
