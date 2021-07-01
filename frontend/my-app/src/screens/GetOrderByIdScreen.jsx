import React, { useState,useEffect } from "react";
import { getOrderById } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Row, Image, ListGroup, Button,Modal } from "react-bootstrap";

const GetOrderByIdScreen = ({ location }) => {
  const [show, setShow] = useState(false);
  const [QRCode, setQRCode] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderById(location.pathname.split("/")[3]));
  }, [dispatch, location]);

  const order = useSelector((state) => state.getOrderById);
  const { loading, orderDetails, error, success } = order;

  const modalCloseHandler = () =>{
    setShow(false)
  }
  const modalOpenHandler = () =>{
    setQRCode()
    setShow(true)
  }

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
                  <Message variant="info">Not Shippied</Message>
                )}
              </ListGroup.Item>
              <br />
              <ListGroup.Item>
                <h3>Payment Method: {orderDetails.paymentMethod}</h3>
                <br />
                {!orderDetails.isPaid && (
                  <Button onClick={modalOpenHandler}>Not paid, go to pay</Button>
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


      <Modal show={show} onHide={modalCloseHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Order ID: {orderDetails && orderDetails._id}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <p>Payment Method: {orderDetails && orderDetails.paymentMethod}</p>
        <Image src={QRCode}></Image>
        <p>Total Price: {orderDetails && orderDetails.totalPrice}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={modalCloseHandler}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default GetOrderByIdScreen;
