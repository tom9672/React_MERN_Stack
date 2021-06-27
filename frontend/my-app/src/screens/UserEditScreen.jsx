import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form,  Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails,updateUserDetailsByAdmin } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import {USER_ADMIN_UPDATE_RESET} from '../constant/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdateByAdmin;

  useEffect(() => {
    if(successUpdate){
      dispatch({type:USER_ADMIN_UPDATE_RESET})
      history.push('/admin/userList')
    }else{
      if(!user.name || user._id !== userId){
        dispatch(getUserDetails(userId))
      }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch,user,userId,successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserDetailsByAdmin({_id:userId, name, email, isAdmin}))
  };

  return (
    <FormContainer>
        <Link to={'/admin/userList'} className='btn btn-dark my-3'>Back</Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader/>}
      {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
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
  
          <Form.Group controlId="email">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              placeholder="Please enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
  
          <Form.Group controlId="isadmin">
            <Form.Check
                type='checkbox'
                label='Admin'
                checked={isAdmin}
                onChange={(e)=>{setIsAdmin(e.target.checked)}}
            ></Form.Check>
          </Form.Group>
  
          
  
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
      

      
      
    </FormContainer>
  );
};

export default UserEditScreen;
