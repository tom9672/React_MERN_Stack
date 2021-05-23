import React, { useEffect, useState } from "react";
import { Button, Col, Row, Image, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps";
import Message from "../components/Message";
import { orderCreate } from "../actions/orderActions";
import { clearCart } from "../actions/cartActions";

const PlaceOrderScreen = ({ history }) => {
  const [submit, setSubmit] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const placeOrderHandler = () => {
    dispatch(
      orderCreate({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: 10,
        totalPrice: Number(itemsPrice) + 10,
      })
    );
    setSubmit(true);
    dispatch(clearCart());
  };

  const { error, orderDetails, success } = useSelector(
    (state) => state.orderCreate
  );

  useEffect(() => {
    if (success && submit) {
      history.push(`/order/success/${orderDetails._id}`);
    }
  });

  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md="8">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Shipping Address</h3>
              Street: {cart.shippingAddress.address} <br />
              City: {cart.shippingAddress.city}
              <br />
              PostalCode: {cart.shippingAddress.postalCode}
              <br />
              State: {cart.shippingAddress.provience}
              <br />
            </ListGroup.Item>
            <br />
            <ListGroup.Item>
              <h3>Payment Method</h3>
              Payment: {cart.paymentMethod}
            </ListGroup.Item>
            <br />
            <ListGroup.Item>
              <h3>Order Details</h3>
              {cart.cartItems.length === 0 ? (
                <Message>Empty Cart</Message>
              ) : (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col md="2">Image</Col>
                      <Col md="2">Name</Col>
                      <Col md="2">Price(each)</Col>
                      <Col md="2">quantity</Col>
                      <Col md="2">total</Col>
                    </Row>
                  </ListGroup.Item>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md="2">
                          <Image src={item.image} alt={item.name} fluid></Image>
                        </Col>
                        <Col md="2">{item.name}</Col>
                        <Col md="2">{item.price}</Col>
                        <Col md="2">{item.qty}</Col>
                        <Col md="2">{item.price * item.qty}</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md="4">
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order</h3>Total Price: ¥{itemsPrice}
              </ListGroup.Item>
              <ListGroup.Item>Shipping fee: ¥10</ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Confirm Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
