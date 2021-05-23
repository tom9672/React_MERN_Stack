import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = (history) => {
  const myHistory = useHistory();
  const [loginUser, setLoginUser] = useState([]);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get("/users");
      var users = [];
      for (var i = 0; i < data.length; i++) {
        var user = data[i];
        users.push(user);
      }
      setUsers(users);
    };
    fetchUsers();

    const fetchLogin = () => {
      if (history.location) {
        setLoginUser(history.location.state);
      }
    };

    fetchLogin();
  }, [history]);

  const handleLogin = (event) => {
    event.preventDefault();
    for (var i = 0; i < users.length; i++) {
      if (
        (users[i].email === inputEmail.current.value) &
        (users[i].password === inputPassword.current.value)
      ) {
        myHistory.push("/");
      } else {
        console.log("no");
      }
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            ref={inputEmail}
            placeholder="Enter email"
            defaultValue={loginUser ? loginUser.email : ""}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={inputPassword}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={handleLogin}
          className="btn-block"
        >
          Login
        </Button>
        <br />
        <p>
          Don't have an account? <Link to="/register">Click to register</Link>
        </p>
      </Form>
    </Row>
  );
};

export default Login;
