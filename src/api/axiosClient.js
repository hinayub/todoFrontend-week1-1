import axios from 'axios';
import store from '../redux/store';
import { LOGOUT, TOKEN_REFRESHED } from '../redux/constants/authConstants';

export const API_BASE_URL = 'http://localhost:8000/api';

// This is the axios instance every part of the app uses to call the API.
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // sends the httpOnly refresh_token cookie automatically
});

// ---- STEP 1: Before every request, attach the access token ----
// The access token lives in Redux (in memory only, never localStorage).
axiosClient.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// ---- STEP 2: How to get a brand new access token ----
// The browser already holds a refresh_token cookie (httpOnly, sent automatically).
// We just call the refresh endpoint and store the new access token in Redux.
async function getNewAccessToken() {
  const response = await axios.post(
    `${API_BASE_URL}/auth/refresh/`,
    {},
    { withCredentials: true }
  );

  const newAccessToken = response.data.access;
  store.dispatch({ type: TOKEN_REFRESHED, payload: newAccessToken });

  return newAccessToken;
}

// If 5 requests fail at the same time, we don't want to call refresh 5 times.
// This makes every caller share the same in-flight refresh request.
let pendingRefresh = null;

export function refreshAccessToken() {
  if (!pendingRefresh) {
    pendingRefresh = getNewAccessToken().finally(() => {
      pendingRefresh = null;
    });
  }
  return pendingRefresh;
}

// ---- STEP 3: When a request fails with 401, try to refresh and retry once ----
function isAuthEndpoint(url = '') {
  return (
    url.includes('/auth/login') ||
    url.includes('/auth/register') ||
    url.includes('/auth/refresh')
  );
}

axiosClient.interceptors.response.use(
  (response) => response, // success, nothing to do
  async (error) => {
    const failedRequest = error.config;
    const gotUnauthorized = error.response?.status === 401;
    const alreadyRetried = failedRequest?._retry;

    // Only attempt a refresh+retry for real 401s on non-auth endpoints,
    // and only once per request (avoid infinite retry loops).
    if (!gotUnauthorized || alreadyRetried || isAuthEndpoint(failedRequest?.url)) {
      return Promise.reject(error);
    }

    failedRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();
      failedRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosClient(failedRequest); // retry the original request
    } catch (refreshError) {
      // Refresh token is invalid/expired too -> log the user out.
      store.dispatch({ type: LOGOUT });
      return Promise.reject(refreshError);
    }
  }
);

export default axiosClient;
