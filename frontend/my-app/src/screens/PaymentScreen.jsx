import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";
const PaymentScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState("WeChat");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Select Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Payment: {paymentMethod}</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="WeChat"
              id="WeChat"
              name="paymentMethod"
              value="WeChat"
              defaultChecked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="PayPal"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>

            <Form.Check
              type="radio"
              label="Alipay"
              id="Alipay"
              name="paymentMethod"
              value="Alipay"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit">Next Step</Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
