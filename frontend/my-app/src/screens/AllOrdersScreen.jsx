import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
const AllOrdersScreen = ({ location }) => {
  const disptch = useDispatch();
  const userId = location.pathname.split("/")[3];

  useEffect(() => {
    disptch(getAllOrders(userId));
  }, [disptch, userId]);
  const { loading, allOrders, success, error } = useSelector(
    (state) => state.getAllOrders
  );

  return (
    <div>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {success && (
        <ListGroup>
          {allOrders.length === 0 ? (
            <Message>No Orders</Message>
          ) : (
            <Row>
              <Col md="6">
                <ListGroup variant="flush">
                  {allOrders.reverse().map((item, index) => (
                    <ListGroup key={index}>
                      {`Created at: ${item.time.split("T")[0]}`} / Total Price:
                      ¥{item.totalPrice} (contain{" ¥10"} shipping fee)
                      {item.orderItems.map((orderItem) => (
                        <ListGroup.Item key={orderItem._id}>
                          <Row>
                            <Col md="1">
                              <Image
                                src={orderItem.image}
                                alt={orderItem.name}
                                width="30px"
                                fluid
                              ></Image>
                            </Col>
                            <Col md="2">{orderItem.name}</Col>
                            <Col md="3">
                              {orderItem.price} * {orderItem.qty} =
                              {orderItem.price * orderItem.qty}
                            </Col>

                            {/* <Col md="2">
                          {orderItem.isDelived
                            ? "Check Shipping"
                            : "Not Shipped"}
                        </Col>

                        <Col md="4" style={{ textAlign: "right" }}>
                          {orderItem.isPaid ? (
                            "Paid"
                          ) : (
                            <Link to="/pay">Click to pay</Link>
                          )}
                        </Col>*/}
                          </Row>
                        </ListGroup.Item>
                      ))}
                      <Link
                        style={{ textAlign: "right" }}
                        to={`/order/success/${item._id}`}
                      >
                        Check Details
                      </Link>
                      <br />
                    </ListGroup>
                  ))}
                </ListGroup>
              </Col>
              <Col md="6"></Col>
            </Row>
          )}
        </ListGroup>
      )}
    </div>
  );
};

export default AllOrdersScreen;
