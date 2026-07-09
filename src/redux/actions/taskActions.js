import axiosClient from "../../api/axiosClient";
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
    const { data } = await axiosClient.get("/tasks/tasks/");
    dispatch({ type: TASK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: TASK_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

// POST /api/tasks/tasks/  ->  { description, date, time }
export const createTask = (task) => async (dispatch) => {
  dispatch({ type: TASK_CREATE_REQUEST });
  try {
    const { data } = await axiosClient.post("/tasks/tasks/", task);
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
    const { data } = await axiosClient.patch(`/tasks/tasks/${id}/`, task);
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
    await axiosClient.delete(`/tasks/tasks/${id}/delete/`);
    dispatch({ type: TASK_DELETE_SUCCESS, payload: id });
    return { success: true };
  } catch (error) {
    dispatch({ type: TASK_DELETE_FAIL, payload: getErrorMessage(error) });
    return { success: false };
  }
};
