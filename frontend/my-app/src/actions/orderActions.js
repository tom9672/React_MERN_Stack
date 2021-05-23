import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_GETBYID_REQUEST,
  ORDER_GETBYID_SUCCESS,
  ORDER_GETBYID_FAIL,
  ORDER_GETALL_REQUEST,
  ORDER_GETALL_SUCCESS,
  ORDER_GETALL_FAIL,
} from "../constant/orderConstants";
import axios from "axios";

export const orderCreate = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/orders", order, config);

    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getOrderById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_GETBYID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: ORDER_GETBYID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_GETBYID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getAllOrders = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_GETALL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/user/${id}`, config);
    dispatch({ type: ORDER_GETALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_GETALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
