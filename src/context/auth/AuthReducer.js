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
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PAYAVENUES,
  PAYAVENUES_ERROR,
  APPLY_LOAN_ERROR,
  APPLY_LOAN,
  GET_UNPROCESSED_LOANS,
  GET_UNPROCESSED_LOANS_ERROR,
  GET_ONE_UNPROCESSED_LOAN,
  GET_ONE_UNPROCESSED_LOAN_ERROR,
  DENY_LOAN_ERROR,
  APPROVE_LOAN_ERROR,
  DENY_LOAN,
  APPROVE_LOAN,
  GET_USER_LOANS,
  GET_USER_LOANS_ERROR,
  MAKE_PAYMENT,
  MAKE_PAYMENT_ERROR,
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
    case GET_UNPROCESSED_LOANS:
      return {
        ...state,
        unprocessed: action.payload,
        loading: false,
      };
    case GET_ONE_UNPROCESSED_LOAN:
      return {
        ...state,
        oneunprocessed: action.payload,
        loading: false,
      };
      case MAKE_PAYMENT:
        return {
          ...state,
          makepayment: action.payload,
          loading: false,
        };
    case PAYAVENUES:
      return {
        ...state,
        getpayavenues: action.payload,
        loading: false,
      };
    case APPLY_LOAN:
      return {
        ...state,
        applyloan: action.payload,
        loading: false,
      };

    case GET_USER_LOANS:
      return {
        ...state,
        userloans: action.payload,
        loading: false,
      };
    case APPROVE_LOAN:
      return {
        ...state,
        approveloan: action.payload,
        loading: false,
      };
    case DENY_LOAN:
      return {
        ...state,
        denyloan: action.payload,
        loading: false,
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

    case REGISTER_FAIL:
    case PAYAVENUES_ERROR:
    case APPLY_LOAN_ERROR:
    case GET_UNPROCESSED_LOANS_ERROR:
    case GET_ONE_UNPROCESSED_LOAN_ERROR:
    case DENY_LOAN_ERROR:
    case APPROVE_LOAN_ERROR:
    case GET_USER_LOANS_ERROR:
    case MAKE_PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        addedUser: null,
        applyloan: null,
        denyloan: null,
        approveloan: null,
        makepayment:null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
