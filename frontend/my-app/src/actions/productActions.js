import {
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
} from "../constant/productConstants";

import axios from "axios";

export const listProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const detailProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const deleteProductById =(id)=> async (dispatch, getState) =>{
  try{
    dispatch({type:PRODUCT_ADMIN_DELETE_REQUEST})

    const {userLogin:{userInfo}} =getState()

    const config ={headers:{Authorization: `Bearer ${userInfo.token}`}}

    await axios.delete(`/api/products/${id}`, config)
    dispatch({type:PRODUCT_ADMIN_DELETE_SUCCESS})
  }catch(error){
    dispatch({
      type:PRODUCT_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.response
    })
  }
} 


export const updateProduct =(product)=> async (dispatch, getState) =>{
  try{
    dispatch({type:PRODUCT_ADMIN_UPDATE_REQUEST})

    const {userLogin:{userInfo}} =getState()

    const config ={headers:{Authorization: `Bearer ${userInfo.token}`}}

    const {data} = await axios.put(`/api/products/${product._id}`, product, config)
    dispatch({type:PRODUCT_ADMIN_UPDATE_SUCCESS})
    dispatch({type:PRODUCT_DETAIL_SUCCESS, payload:data })
  }catch(error){
    dispatch({
      type:PRODUCT_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.response
    })
  }
} 

export const createProduct =()=> async (dispatch, getState) =>{
  try{
    dispatch({type:PRODUCT_ADMIN_CREATE_REQUEST})

    const {userLogin:{userInfo}} =getState()

    const config ={headers:{Authorization: `Bearer ${userInfo.token}`}}

    const {data} = await axios.post(`/api/products/`,{}, config)
    dispatch({type:PRODUCT_ADMIN_CREATE_SUCCESS, payload:data})

  }catch(error){
    dispatch({
      type:PRODUCT_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.response
    })
  }
} 

export const createProductReview =(id, review)=> async (dispatch, getState) =>{
  try{
    dispatch({type:PRODUCT_REVIEW_REQUEST})

    const {userLogin:{userInfo}} =getState()

    const config ={headers:{Authorization: `Bearer ${userInfo.token}`}}

    await axios.post(`/api/products/${id}/review`, review, config)
    dispatch({type:PRODUCT_REVIEW_SUCCESS})

  }catch(error){
    dispatch({
      type:PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
        ? error.response.data.message
        : error.response
    })
  }
} 