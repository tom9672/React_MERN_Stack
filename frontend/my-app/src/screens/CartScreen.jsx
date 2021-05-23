import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.pathname.includes("qty")
    ? location.pathname.split("=")[1]
    : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const deleteFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    // history.push("");
    if (userInfo) {
      history.push("/shipping");
    } else {
      history.push("/login");
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Empty, <Link to="/">Home Page</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key="item.id">
                <Row>
                  <Col md="2">
                    <Image src={item.image} alt={item.name} fluid></Image>
                  </Col>
                  <Col md="2">{item.name}</Col>
                  <Col md="2">{item.price}</Col>
                  <Col md="2">
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.quantity).keys()].map((i) => {
                        return (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                  <Col md="2">
                    <Button
                      type="button"
                      onClick={() => {
                        deleteFromCartHandler(item.product);
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {" "}
              <h3>
                Total {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                Products
              </h3>
              ¥{" "}
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Check out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
