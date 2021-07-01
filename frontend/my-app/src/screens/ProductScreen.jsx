import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import Sale from "../components/Sale";
import { useDispatch, useSelector } from "react-redux";
import { detailProduct,createProductReview } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {PRODUCT_REVIEW_RESET} from '../constant/productConstants'
import {Row,Col,ListGroup,Button,Form } from 'react-bootstrap'
import Rating from '../components/Rating'


const ProductScreen = ({ match }) => {

  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  const userLoginState = useSelector((state)=>state.userLogin)
  const {userInfo} = userLoginState

  const createProductReviewState = useSelector((state) => state.createProductReview);
  const { error:errorProductReview, success } = createProductReviewState;

  useEffect(() => {
    if(success){
      setRating(5)
      setComment('')
    }
    dispatch(detailProduct(match.params.id));
    dispatch({type:PRODUCT_REVIEW_RESET})
  }, [dispatch, match, success]);

  const reviewHandler = (e)=>{
    e.preventDefault()
    dispatch(createProductReview(match.params.id, {rating, comment}))
  }

 
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

      <br /> <br /> <br />

      {product.reviews ? (<Row>
        <Col>
          
          {product.reviews.length===0 && <Message>No Reviews</Message>}
          <ListGroup variant='flush'>
          <ListGroup.Item>
          <h2>Reviews</h2>
          </ListGroup.Item>
          
          {product.reviews.map((review)=>(
            <ListGroup.Item key={review._id}>
              <strong>From: {review.name} </strong>
              <p>Comment: {review.comment}</p>
              <Rating value={review.rating}/>
              <p>{review.createdAt}</p>
            </ListGroup.Item>
          ))}

          {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

          <ListGroup.Item >
            <h2>Add Review</h2>
            {userInfo ? 
            (<Form onSubmit={reviewHandler}>
              <Form.Group>
                <Form.Label>Rating:</Form.Label>
                <Form.Control as='select' value={rating} onChange={e=>setRating(e.target.value)}>   
                  <option value='5'>5 - Very satisfied</option>
                  <option value='4'>4 - Satisfied</option>
                  <option value='3'>3 - Normal</option>
                  <option value='2'>2 - Dissatisfied</option>
                  <option value='1'>1 - Very dissatisfied</option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
              <Form.Control as='textarea' row='3' value={comment} onChange={e=>setComment(e.target.value)}>

              </Form.Control> 
              </Form.Group>
              <Button type='submit' variant='primary'>Submit</Button>
            </Form>):
            (<Message>Please <Link to='/login'>Login</Link> before post review</Message>)}
          </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>):(<Loader/>)}
    </>
  );
};

export default ProductScreen;
