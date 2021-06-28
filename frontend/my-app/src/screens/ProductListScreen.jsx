import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProduct,deleteProductById, createProduct } from "../actions/productActions";
import {PRODUCT_ADMIN_CREATE_RESET} from '../constant/productConstants'

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteProductByIdState = useSelector((state) => state.deleteProductById);
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = deleteProductByIdState;

  const createProductState = useSelector((state) => state.createProduct);
  const { loading:loadingCreate, error:errorCreate, success:successCreate, product:productCreate } = createProductState;

  useEffect(() => {
    dispatch({type:PRODUCT_ADMIN_CREATE_RESET})
    if(!userInfo.isAdmin){
      history.push("/login");
    }
    if(successCreate){
      history.push(`/admin/product/${productCreate._id}/edit`)
    }else{
      dispatch(listProduct())
    }
  }, [dispatch, history, userInfo, successDelete, successCreate, productCreate]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProductById(id))
    }
  };

  const addProductHandler =()=>{
      dispatch(createProduct())
  }

  return (
    <>
        <Row>
            <Col><h1>User List</h1></Col>
            <Col className='text-right'><Button className='my-3' onClick={addProductHandler}>Add product</Button></Col>
        </Row>

      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              {/* <th>Brand</th> */}
              <th>Quantity</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td><Image src={product.img} width='50px'></Image></td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                {/* <td>{product.brand}</td> */}
                <td>{product.quantity}</td>
                
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
