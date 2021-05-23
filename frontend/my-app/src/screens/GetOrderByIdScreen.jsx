import React, { useEffect } from "react";
import { getOrderById } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Row, Image, ListGroup } from "react-bootstrap";

const GetOrderByIdScreen = ({ location }) => {
  //const [order, setOrder] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(location.pathname.split("/")[3]));
  }, [dispatch, location]);

  const order = useSelector((state) => state.getOrderById);
  const { loading, orderDetails, error, success } = order;
  return (
    <div>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}

      {success && (
        <Row>
          <Col md="12">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Shipping Address</h3>
                Street: {orderDetails.shippingAddress.address} <br />
                City: {orderDetails.shippingAddress.city}
                <br />
                PostalCode: {orderDetails.shippingAddress.postalCode}
                <br />
                State: {orderDetails.shippingAddress.provience}
                <br />
                {!orderDetails.isDelived && (
                  <Message variant="danger">Not Shippied</Message>
                )}
              </ListGroup.Item>
              <br />
              <ListGroup.Item>
                <h3>Payment Method</h3>
                Payment: {orderDetails.paymentMethod}
                {!orderDetails.isPaid && (
                  <Message variant="danger">Not paid</Message>
                )}
              </ListGroup.Item>
              <br />
              <ListGroup.Item>
                <h3>Order Details</h3>
                {orderDetails.orderItems.length === 0 ? (
                  <Message>Empty orderDetails</Message>
                ) : (
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col md="2">Image</Col>
                        <Col md="2">Name</Col>
                        <Col md="2">Price(each)</Col>
                        <Col md="2">quantity</Col>
                        {/* <Col md="2">total</Col> */}
                      </Row>
                    </ListGroup.Item>
                    {orderDetails.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md="2">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                            ></Image>
                          </Col>
                          <Col md="2">{item.name}</Col>
                          <Col md="2">{item.price}</Col>
                          <Col md="2">{item.qty}</Col>
                          {/* <Col md="2">{item.price * item.qty}</Col> */}
                        </Row>
                      </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                      <h1>
                        Total Price: ¥ {orderDetails.totalPrice} +
                        {`(Shipping free: ${orderDetails.ShippingPrice})`}
                      </h1>
                    </ListGroup.Item>
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default GetOrderByIdScreen;
