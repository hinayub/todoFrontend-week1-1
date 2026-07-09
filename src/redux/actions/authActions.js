import axios from 'axios';
import axiosClient, {
  API_BASE_URL,
  refreshAccessToken,
} from '../../api/axiosClient';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGOUT,
  AUTH_CHECK_DONE,
} from '../constants/authConstants';

// Pull a readable message out of a DRF/axios error.
const getErrorMessage = (error) => {
  const data = error.response?.data;
  if (!data) return error.message || 'Something went wrong';
  if (typeof data === 'string') return data;
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
    const { data } = await axiosClient.post('/auth/login/', credentials);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: data.user, accessToken: data.access },
    });
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
    const { data } = await axiosClient.post('/auth/register/', details);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: { user: data.user, accessToken: data.access },
    });
    return { success: true, data };
  } catch (error) {
    dispatch({ type: SIGNUP_FAIL, payload: getErrorMessage(error) });
    return { success: false };
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await axiosClient.post('/auth/logout/');
  } catch {
    // Ignore -- we're logging out client-side regardless.
  }
  dispatch({ type: LOGOUT });
};

// Called once on app startup: if a valid refresh cookie exists from a previous
// session, silently obtain a new access token instead of forcing a re-login.
export const restoreSession = () => async (dispatch) => {
  try {
    const accessToken = await refreshAccessToken();
    const { data } = await axios.get(`${API_BASE_URL}/auth/me/`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    dispatch({ type: LOGIN_SUCCESS, payload: { user: data, accessToken } });
  } catch {
    // No valid refresh cookie -- user is simply not logged in.
  } finally {
    dispatch({ type: AUTH_CHECK_DONE });
  }
};
