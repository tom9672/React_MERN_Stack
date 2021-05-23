import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.img} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Card.Text>{product.price}</Card.Text>
        <Rating
          value={product.rating}
          text={`from ${product.reviews.length} review(s)`}
        />
      </Card.Body>
    </Card>
  );
};

export default Product;
