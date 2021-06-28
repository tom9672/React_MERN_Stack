import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_CREATE_RESET,
  PRODUCT_ADMIN_UPDATE_RESET,
} from "../constant/productConstants";

export const productListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deleteProductByIdReducer = (state={}, action) =>{
  switch (action.type) {
    case PRODUCT_ADMIN_DELETE_REQUEST:
      return {laoding:true}
    case PRODUCT_ADMIN_DELETE_SUCCESS:
      return {loading:false, success: true}
    case PRODUCT_ADMIN_DELETE_FAIL:
      return {laoding:false, error:action.payload}
  
    default:
      return state
  }
}

export const updateProductReducer = (state={},action) =>{
  switch (action.type) {
    case PRODUCT_ADMIN_UPDATE_REQUEST:
      return {laoding:true}
    case PRODUCT_ADMIN_UPDATE_SUCCESS:
      return {laoding:false, success:true}
    case PRODUCT_ADMIN_UPDATE_FAIL:
      return {laoding:false, error:action.payload}
    case PRODUCT_ADMIN_UPDATE_RESET:
      return {}
    default:
      return state
  }
}


export const createProductReducer = (state={},action) =>{
  switch (action.type) {
    case PRODUCT_ADMIN_CREATE_REQUEST:
      return {loading:true}
    case PRODUCT_ADMIN_CREATE_SUCCESS:
      return {loading:false, success:true, product: action.payload}
    case PRODUCT_ADMIN_CREATE_FAIL:
      return {loading:false, error:action.payload}
    case PRODUCT_ADMIN_CREATE_RESET: 
      return {}
    
    default:
      return state
  }
}