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
  ORDER_ADMIN_GETALL_REQUEST,
  ORDER_ADMIN_GETALL_SUCCESS,
  ORDER_ADMIN_GETALL_FAIL,
} from "../constant/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true, success: false };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, orderDetails: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getOrderByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_GETBYID_REQUEST:
      return { loading: true, success: false };
    case ORDER_GETBYID_SUCCESS:
      return { loading: false, orderDetails: action.payload, success: true };
    case ORDER_GETBYID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getAllOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_GETALL_REQUEST:
      return { loading: true, success: false };

    case ORDER_GETALL_SUCCESS:
      return { loading: false, allOrders: action.payload, success: true };

    case ORDER_GETALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderListReducer = (state = {orders:[]}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_GETALL_REQUEST:
      return { loading: true };

    case ORDER_ADMIN_GETALL_SUCCESS:
      return { loading: false, orders: action.payload };

    case ORDER_ADMIN_GETALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
