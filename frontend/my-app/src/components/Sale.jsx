import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Rating from "../components/Rating";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";

const Sale = ({ product }) => {
  const [qty, setQty] = useState(1);
  const history = useHistory();


  const addToCartHandler = () => {
    history.push(`/cart/${product._id}/qty=${qty}`);
  };
  return product ? (
    <Row>
      <Col md={6}>
        <Image src={product.img} alt={product.name} fluid />
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{product.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            Rating: <Rating value={product.rating} text={`from ${product.numReviews} reviews`} />
          </ListGroup.Item>
          <ListGroup.Item>
            <h3>Price: {product.price}</h3>
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>{product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>In Stock:</Col>
                <Col>
                  <strong>{product.quantity}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Count</Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(product.quantity).keys()].map((i) => {
                      return (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                disabled={product.quantity === 0}
                onClick={addToCartHandler}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  ) : (
    <p>Loading...</p>
  );
};

export default Sale;
