import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  TOKEN_REFRESHED,
  AUTH_CHECK_DONE,
} from "../constants/authConstants";

const initialState = {
  loading: false,
  authChecked: false, // true once the initial silent-refresh attempt on app load has resolved
  isAuthenticated: false,
  user: null,
  accessToken: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        error: null,
      };

    case LOGIN_FAIL:
    case SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    case TOKEN_REFRESHED:
      return {
        ...state,
        isAuthenticated: true,
        accessToken: action.payload,
      };

    case AUTH_CHECK_DONE:
      return { ...state, authChecked: true };

    case LOGOUT:
      return { ...initialState, authChecked: true };

    default:
      return state;
  }
};

export default authReducer;
