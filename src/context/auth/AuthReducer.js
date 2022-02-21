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
      
      case PAYAVENUES:
      return {
        ...state,
        getpayavenues: action.payload,
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
      };
    default:
      return state;
  }
};

export default AuthReducer;
