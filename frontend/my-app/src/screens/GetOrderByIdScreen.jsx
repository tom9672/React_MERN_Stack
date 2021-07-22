import React, { useState,useEffect } from "react";
import { getOrderById } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Col, Row, Image, ListGroup, Button,Modal } from "react-bootstrap";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

const GetOrderByIdScreen = ({ location,history }) => {
  const [show, setShow] = useState(false);
  const [QRCode, setQRCode] = useState('');
  const [SDK, setSDK] = useState(false);
  const dispatch = useDispatch();

  const order = useSelector((state) => state.getOrderById);
  const { loading, orderDetails, error, success } = order;
  
  const userLoginState = useSelector((state) => state.userLogin);
  const { userInfo } = userLoginState;

  useEffect(() => {
    const getPaypalClientId = async () =>{
      const {data:clientId} = await axios.get('/api/config/paypal_client_id')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onLoad = () =>{
        setSDK(true)
      }
      document.body.append(script)
    }
    
    if(!userInfo){
      history.push('/login')
    }
    if(!order.isPaid){
      if(!window.paypal){
        getPaypalClientId()
      }
    }else{
      setSDK(true)
    }

    dispatch(getOrderById(location.pathname.split("/")[3]));
  }, [dispatch, location, userInfo, history]);


  const modalCloseHandler = () =>{
    setShow(false)
  }
  const modalOpenHandler = () =>{
    setQRCode()
    setShow(true)
  }

  const successPaymenthandler = async (paymentResult) =>{
    
    if(paymentResult.status === "COMPLETED"){
      try{
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        console.log(userInfo.token)
        const {data} = await axios.put(`/api/orders/${orderDetails._id}`, config)
        console.log(data)
      }catch(error){
        console.log(error)
      }
     
    }
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
                {!orderDetails.isPaid & orderDetails.paymentMethod ==='PayPal' ? (
                  <PayPalButton
                  amount={orderDetails.totalPrice}
                  onSuccess={successPaymenthandler}
                />
                ) : !orderDetails.isPaid & orderDetails.paymentMethod === 'WeChat' ? (
                  <Button>WeiChat Pay</Button>
                ) : !orderDetails.isPaid & orderDetails.paymentMethod === 'Alipay' ?(
                  <Button>AliPay</Button>
                ):
                <p>You've already paid</p>}

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
