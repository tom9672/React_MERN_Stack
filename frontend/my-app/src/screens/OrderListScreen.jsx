import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { orderList } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderListState = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderListState;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(orderList());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Order List</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Date</th>
              <th>Total price</th>
              <th>Pay state</th>
              <th>Ship state</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                 <td>{order._id}</td>
                <td>{order.user && order.user._id}</td>
                <td>{order.time.split("T")[0]}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? (order.paidAt):(<i className="fas fa-times" style={{ color: "red" }}></i>)}</td>
                <td>{order.isDelived ? (order.deliveredAt) : (<i className="fas fa-times" style={{ color: "red" }}></i>)}</td>
                <td>
                  <LinkContainer to={`/order/success/${order._id}`}>
                    <Button variant="primary" className="btn-sm">
                      Check Order
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
