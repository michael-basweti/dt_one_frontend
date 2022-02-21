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
  GET_USERTYPES,
  GET_USERTYPES_ERROR,
  GET_DEBT_EXECUTIVES,
  GET_DEBT_EXECUTIVES_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
  ACTIVATE_USERS,
  ACTIVATE_USERS_ERROR,
  DEACTIVATE_USERS,
  DEACTIVATE_USERS_ERROR,
  GET_APPROVE_USER,
  GET_APPROVE_USER_ERROR,
  APPROVE_USER,
  APPROVE_USER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_EXECS,
  REGISTER_EXECS_ERROR,
  SEARCH_BY_INVOICE,
  SEARCH_BY_INVOICE_ERROR,
  ASSIGN_USERS,
  ASSIGN_USERS_ERROR,
  REASSIGN_USERS,
  REASSIGN_USERS_ERROR,
  GET_INVOICE_STATUS,
  GET_INVOICE_STATUS_ERROR,
  GET_STATS,
  GET_STATS_ERROR,
  
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null,
    pass_change:null,
    usertypes:null,
    collectors:null,
    allusers:null,
    activatedUser: null,
    deactivatedUser: null,
    approveusers:null,
    Approved:null,
    addedUser:null,
    addedExec:null,
    invoice:null,
    assign:null,
    reassign:null,
    invoicestatus:null,
    stats:null,
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

  // Assign users
  const AssignUsers = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server_url}invoice/assign`,
        formData,
        config
      );
      dispatch({
        type: ASSIGN_USERS,
        payload: res.data,
      });
      console.log(res.data);
      // loadUser()
    } catch (err) {
      dispatch({
        type: ASSIGN_USERS_ERROR,
        payload: err.response.data,
      });
      console.log(err.response.data)
    }
  };

  const ReAssignUsers = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server_url}invoice/reassign`,
        formData,
        config
      );
      dispatch({
        type: REASSIGN_USERS,
        payload: res.data,
      });
      console.log(res.data);
      // loadUser()
    } catch (err) {
      dispatch({
        type: REASSIGN_USERS_ERROR,
        payload: err.response.data,
      });
      console.log(err.response.data)
    }
  };

  const registerExec = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${server_url}auth/register_debt`,
        formData,
        config
      );
      dispatch({
        type: REGISTER_EXECS,
        payload: res.data,
      });
      console.log(res.data);
      // loadUser()
    } catch (err) {
      dispatch({
        type: REGISTER_EXECS_ERROR,
        payload: err.response.data,
      });
      console.log(err.response.data)
    }
  };
  // Approve users
  const ApproveUser = async (id) => {
    // console.log(id);
    try {
      const res = await axios.put(`${server_url}auth/approve/${id}`);
      dispatch({
        type: APPROVE_USER,
        payload: res.data,
      });
      // console.log(res.data);
    } catch (err) {
      dispatch({
        type: APPROVE_USER_ERROR,
        payload: err.response,
      });
      console.log(err.response);
    }
  };

  const activateUser = async (id) => {
    // console.log(id);
    try {
      const res = await axios.put(`${server_url}auth/activate_user/${id}`);
      dispatch({
        type: ACTIVATE_USERS,
        payload: res.data,
      });
      // console.log(res.data);
    } catch (err) {
      dispatch({
        type: ACTIVATE_USERS_ERROR,
        payload: err.response,
      });
      console.log(err.response);
    }
  };

  // deactivate customer
  const deactivateUser = async (id) => {
    console.log(id);
    try {
      const res = await axios.put(
        `${server_url}auth/deactivate_user/${id}`
      );
      dispatch({
        type: DEACTIVATE_USERS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      dispatch({
        type: DEACTIVATE_USERS_ERROR,
        payload: err.response,
      });
      console.log(err.response);
    }
  };

// GET USERTYPES

const getAllUsertypes = async () => {
  try {
    const res = await axios.get(`${server_url}auth/usertypes`);
    dispatch({
      type: GET_USERTYPES,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_USERTYPES_ERROR,
      payload: err.response,
    });
    // console.log(err.response);
  }
};


// Get Invoice Status
const getInvoiceStatus = async () => {
  try {
    const res = await axios.get(`${server_url}invoice/invoicestatus`);
    dispatch({
      type: GET_INVOICE_STATUS,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_INVOICE_STATUS_ERROR,
      payload: err.response,
    });
    // console.log(err.response);
  }
};

const getCollectors = async () => {
  try {
    const res = await axios.get(`${server_url}auth/register_debt`);
    dispatch({
      type: GET_DEBT_EXECUTIVES,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_DEBT_EXECUTIVES_ERROR,
      payload: err.response,
    });
    // console.log(err.response);
  }
};

const GetInvoiceAssign = async (invoice) => {
  try {
    const res = await axios.get(`${server_url}invoice/invoices/${invoice}`);
    dispatch({
      type: SEARCH_BY_INVOICE,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: SEARCH_BY_INVOICE_ERROR,
      payload: err.response,
    });
    console.log(err.response);
  }
};

const getUsers = async () => {
  try {
    const res = await axios.get(`${server_url}auth/register`);
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_ALL_USERS_ERROR,
      payload: err.response,
    });
    // console.log(err.response);
  }
};

const getApproveUsers = async () => {
  try {
    const res = await axios.get(`${server_url}auth/getapprovecustomers`);
    dispatch({
      type: GET_APPROVE_USER,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_APPROVE_USER_ERROR,
      payload: err.response,
    });
    // console.log(err.response);
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


  // Get Rim Type
const GetStats = async () => {
  try {
    const res = await axios.get(`${server_url}invoice/count`);
    dispatch({
      type: GET_STATS,
      payload: res.data,
    });
    // console.log(res.data);
  } catch (err) {
    dispatch({
      type: GET_STATS_ERROR,
      payload: err.response,
    });
    // console.log(err.response);
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
        getAllUsertypes,
        getCollectors,
        getUsers,
        deactivateUser,
        activateUser,
        getApproveUsers,
        ApproveUser,
        register,
        registerExec,
        GetInvoiceAssign,
        AssignUsers,
        ReAssignUsers,
        getInvoiceStatus,
        GetStats,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
