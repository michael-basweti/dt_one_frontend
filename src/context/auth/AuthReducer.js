/* eslint-disable import/no-anonymous-default-export */
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  PASS_CHANGE,
  PASS_CHANGE_ERROR,
  GET_USERTYPES_ERROR,
  GET_USERTYPES,
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
  APPROVE_USER_ERROR,
  APPROVE_USER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REGISTER_EXECS_ERROR,
  REGISTER_EXECS,
  SEARCH_BY_INVOICE_ERROR,
  SEARCH_BY_INVOICE,
  REASSIGN_USERS_ERROR,
  ASSIGN_USERS_ERROR,
  REASSIGN_USERS,
  ASSIGN_USERS,
  GET_INVOICE_STATUS,
  GET_INVOICE_STATUS_ERROR,
  GET_STATS,
  GET_STATS_ERROR,
} from "../types";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        addedUser: action.payload,
        loading: false,
      };
    case REGISTER_EXECS:
      return {
        ...state,
        addedExec: action.payload,
        loading: false,
      };
    case GET_APPROVE_USER:
      return {
        ...state,
        loading: false,
        approveusers: action.payload,
      };
    case GET_USERTYPES:
      return {
        ...state,
        loading: false,
        usertypes: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        loading: false,
        allusers: action.payload,
      };
    case ACTIVATE_USERS:
      return {
        ...state,
        activatedUser: action.payload,
        loading: false,
      };
    case DEACTIVATE_USERS:
      return {
        ...state,
        deactivatedUser: action.payload,
        loading: false,
      };
    case SEARCH_BY_INVOICE:
      return {
        ...state,
        invoice: action.payload,
        loading: false,
      };
    case APPROVE_USER:
      return {
        ...state,
        Approved: action.payload,
        loading: false,
      };
    case GET_STATS:
      return {
        ...state,
        loading:false,
        stats:action.payload
      }
    case GET_DEBT_EXECUTIVES:
      return {
        ...state,
        loading: false,
        collectors: action.payload,
      };
    case REASSIGN_USERS:
      return {
        ...state,
        loading: false,
        reassign: action.payload,
      };
    case GET_INVOICE_STATUS:
      return {
        ...state,
        loading: false,
        invoicestatus: action.payload,
      };
    case ASSIGN_USERS:
      return {
        ...state,
        loading: false,
        assign: action.payload,
      };
    case PASS_CHANGE:
      localStorage.setItem("token", `Bearer ${action.payload.token}`);
      // localStorage.setItem('token', (`Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbW…vbSJ9.xiiw0IcY5ISwaEETRAa8Ct1w3ogBUamdjKDUJfIdKrU"}`))
      return {
        ...state,
        pass_change: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", `Bearer ${action.payload.token}`);
      // localStorage.setItem('token', (`Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbW…vbSJ9.xiiw0IcY5ISwaEETRAa8Ct1w3ogBUamdjKDUJfIdKrU"}`))
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case PASS_CHANGE_ERROR:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("userLogged");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case GET_USERTYPES_ERROR:
    case GET_DEBT_EXECUTIVES_ERROR:
    case GET_ALL_USERS_ERROR:
    case DEACTIVATE_USERS_ERROR:
    case ACTIVATE_USERS_ERROR:
    case GET_APPROVE_USER_ERROR:
    case APPROVE_USER_ERROR:
    case REGISTER_FAIL:
    case REGISTER_EXECS_ERROR:
    case SEARCH_BY_INVOICE_ERROR:
    case REASSIGN_USERS_ERROR:
    case ASSIGN_USERS_ERROR:
    case GET_INVOICE_STATUS_ERROR:
    case GET_STATS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        activatedUser: null,
        deactivatedUser: null,
        Approved: null,
        addedUser: null,
        addedExec: null,
        assign: null,
        reassign: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
