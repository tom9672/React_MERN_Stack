import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sale from "../components/Sale";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    dispatch(detailProduct(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link to="/" className="btn btn-dark my-3">
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Sale product={product} />
      )}
    </>
  );
};

export default ProductScreen;
