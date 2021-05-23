import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";
const ShippingAddressScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [provience, setProvience] = useState(shippingAddress.provience);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, provience }));
    history.push("/payment");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Provience</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={provience}
            onChange={(e) => setProvience(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Next Step</Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddressScreen;
