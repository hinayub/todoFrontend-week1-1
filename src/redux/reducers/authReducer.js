import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
} from "../constants/authConstants";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
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
        user: action.payload,
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

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default authReducer;
