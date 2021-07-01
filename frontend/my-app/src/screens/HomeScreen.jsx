import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Title from '../components/Title'
import { PRODUCT_DETAIL_RESET } from "../constant/productConstants";

const HomeScreen = (history) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProduct());

    dispatch({type: PRODUCT_DETAIL_RESET})
  }, [dispatch]);

  return (
    <>
      <Title />
      <h1>Top sale lips</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
