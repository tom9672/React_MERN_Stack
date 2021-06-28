import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form,  Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { detailProduct, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import {PRODUCT_ADMIN_UPDATE_RESET} from '../constant/productConstants'

const ProductEditScreen = ({ match, history }) => {

  const productId = match.params.id

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);

  
  const dispatch = useDispatch();
  const productDetailState = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetailState;

  const updateProductState = useSelector((state) => state.updateProduct);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = updateProductState;

  useEffect(() => {
  
    if(successUpdate){
      dispatch({type:PRODUCT_ADMIN_UPDATE_RESET})
      history.push('/admin/productlist')
    }else{
      if (!product.name || product._id !== productId){
        dispatch(detailProduct(productId))
      }else{
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setImage(product.img)
        setCategory(product.category)
        setQuantity(product.quantity)
      }
    }
  }, [dispatch,history,productId,product,successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({_id:productId, name,price,description,image,category,quantity}))
  };

  return (
    <FormContainer>
      <Link to={'/admin/productlist'} className='btn btn-dark my-3'>Back</Link>
      <h1>Edit product</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <Form onSubmit={submitHandler}>

          <Form.Group controlId="name">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="name"
              placeholder="Please enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId="price">
            <Form.Label>Price: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Please enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
        
          <Form.Group controlId="image">
            <Form.Label>Image: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category: </Form.Label>
            <Form.Control
              type="text"
              placeholder="Please enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>


          <Form.Group controlId="quantity">
            <Form.Label>Quantity: </Form.Label>
            <Form.Control
              type="number"
              placeholder="Please enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          
  
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      )}
      
    </FormContainer>
  );
};

export default ProductEditScreen;
