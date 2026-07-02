import axios from "axios";
import {
  TASK_LIST_REQUEST,
  TASK_LIST_SUCCESS,
  TASK_LIST_FAIL,
  TASK_CREATE_REQUEST,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE_REQUEST,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_DELETE_REQUEST,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
} from "../constants/taskConstants";

const BASE_URL = "http://localhost:8000/api/tasks";

// Read the csrftoken cookie that Django sets (must match the header value exactly).
const getCookieValue = (name) => {
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
};

// Hit the endpoint once so Django sets the csrftoken cookie, then attach the header.
const withCSRF = async (config = {}) => {
  if (!getCookieValue("csrftoken")) {
    await axios.get("http://localhost:8000/api/auth/csrf/", { withCredentials: true });
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
  const firstKey = Object.keys(data)[0];
  const firstVal = data[firstKey];
  return Array.isArray(firstVal) ? firstVal[0] : String(firstVal);
};

// GET /api/tasks/tasks/
export const fetchTasks = () => async (dispatch) => {
  dispatch({ type: TASK_LIST_REQUEST });
  try {
    const { data } = await axios.get(`${BASE_URL}/tasks/`, {
      withCredentials: true,
    });
    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

// POST /api/tasks/tasks/  ->  { description, date, time }
export const createTask = (task) => async (dispatch) => {
  dispatch({ type: TASK_CREATE_REQUEST });
  try {
    const { data } = await axios.post(
      `${BASE_URL}/tasks/`,
      task,
      await withCSRF({ withCredentials: true })
    );
    dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    return { success: true, data };
  } catch (error) {
    dispatch({ type: TASK_CREATE_FAIL, payload: getErrorMessage(error) });
    return { success: false };
  }
};

// PATCH /api/tasks/tasks/<id>/  ->  partial fields to update
export const updateTask = (id, task) => async (dispatch) => {
  dispatch({ type: TASK_UPDATE_REQUEST });
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/tasks/${id}/`,
      task,
      await withCSRF({ withCredentials: true })
    );
    dispatch({ type: TASK_UPDATE_SUCCESS, payload: data });
    return { success: true, data };
  } catch (error) {
    dispatch({ type: TASK_UPDATE_FAIL, payload: getErrorMessage(error) });
    return { success: false };
  }
};

// DELETE /api/tasks/tasks/<id>/delete/
export const deleteTask = (id) => async (dispatch) => {
  dispatch({ type: TASK_DELETE_REQUEST });
  try {
    await axios.delete(
      `${BASE_URL}/tasks/${id}/delete/`,
      await withCSRF({ withCredentials: true })
    );
    dispatch({ type: TASK_DELETE_SUCCESS, payload: id });
    return { success: true };
  } catch (error) {
    dispatch({ type: TASK_DELETE_FAIL, payload: getErrorMessage(error) });
    return { success: false };
  }
};
