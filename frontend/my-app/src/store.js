import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducers,
  productDetailReducers,
  deleteProductByIdReducer,
  updateProductReducer,
  createProductReducer,
  createProductReviewReducer
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateByAdminReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  getOrderByIdReducer,
  getAllOrdersReducer,
  orderListReducer
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducers,
  productDetail: productDetailReducers,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  getOrderById: getOrderByIdReducer,
  getAllOrders: getAllOrdersReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdateByAdmin:userUpdateByAdminReducer,
  deleteProductById:deleteProductByIdReducer,
  updateProduct:updateProductReducer,
  createProduct:createProductReducer,
  orderList:orderListReducer,
  createProductReview:createProductReviewReducer
});

const cartItemsFromStorgae = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const paymentMethodStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorgae,
    shippingAddress: shippingAddressStorage,
    paymentMethod: paymentMethodStorage,
  },
  userLogin: { userInfo: userInfoStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
