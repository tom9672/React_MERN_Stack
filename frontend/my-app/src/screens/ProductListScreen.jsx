import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProduct } from "../actions/productActions";

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProduct());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure")) {
      // delete product
    }
  };

  const addProductHandler =()=>{
      // add product
  }

  return (
    <>
        <Row>
            <Col><h1>User List</h1></Col>
            <Col className='text-right'><Button className='my-3' onClick={addProductHandler}>Add product</Button></Col>
        </Row>
      
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
