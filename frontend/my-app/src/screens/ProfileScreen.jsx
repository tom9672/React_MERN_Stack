import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  getUserDetails,
  updateUserDetails,
  userLogout,
} from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const userUpdate = useSelector((state) => state.userUpdate);
  //   const { success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords not same");
    } else {
      dispatch(updateUserDetails({ id: user._id, name, email, password }));
      dispatch(userLogout());
    }
  };
  return (
    <Container style={{ width: "400px" }}>
      <h1>Update</h1>
      {loading && <Loader />}
      {message && <Message variant="danger">{message}</Message>}
      {/* {success && <Message variant="success">successfully update</Message>} */}
      {error && <Message variant="danger">{error}</Message>}

      <Form.Group controlId="email">
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="email"
          placeholder="Please enter email"
          value={email}
          readOnly
        ></Form.Control>
      </Form.Group>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name: </Form.Label>
          <Form.Control
            type="name"
            placeholder="Please enter user name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Please enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Please confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          SUBMIT
        </Button>
      </Form>
    </Container>
  );
};

export default ProfileScreen;
