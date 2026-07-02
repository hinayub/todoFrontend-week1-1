import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
} from "../constants/authConstants";

const BASE_URL = "http://localhost:8000/api/auth";

// Read the csrftoken cookie that Django sets (must match the header value exactly).
const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

// Hit the endpoint once so Django sets the csrftoken cookie, then attach the header.
const withCSRF = async (config = {}) => {
  if (!getCookieValue("csrftoken")) {
    await axios.get(`${BASE_URL}/csrf/`, { withCredentials: true });
  }
  return {
    ...config,
    headers: { ...config.headers, "X-CSRFToken": getCookieValue("csrftoken") },
  };
};

// Pull a readable message out of a DRF/axios error.
const getErrorMessage = (error) => {
  const data = error.response?.data;
  if (!data) return error.message || "Something went wrong";
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  if (data.message) return data.message;
  // DRF field errors -> take the first one
  const firstKey = Object.keys(data)[0];
  const firstVal = data[firstKey];
  return Array.isArray(firstVal) ? firstVal[0] : String(firstVal);
};

// POST /api/auth/login/  ->  { email, password }
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(
      `${BASE_URL}/login/`,
      credentials,
      await withCSRF({ withCredentials: true })
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user || data });
    return { success: true, data };
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: getErrorMessage(error) });
    return { success: false };
  }
};

// POST /api/auth/register/  ->  { username, email, password }
export const signupUser = (details) => async (dispatch) => {
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const { data } = await axios.post(
      `${BASE_URL}/register/`,
      details,
      await withCSRF({ withCredentials: true })
    );
    dispatch({ type: SIGNUP_SUCCESS, payload: data.user || data });
    return { success: true, data };
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: getErrorMessage(error) });
    return { success: false };
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
