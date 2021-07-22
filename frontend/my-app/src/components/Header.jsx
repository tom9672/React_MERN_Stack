import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../actions/userActions";
import { useHistory } from "react-router-dom";
const Header = () => {

  const adminIcon = (<i className='fas fa-user-cog'>operation</i>)
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useHistory();
  const logoutHandler = () => {
    dispatch(userLogout());
    history.push("");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>XXXX Store</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-cart-arrow-down"></i>
                  Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  style={{ textTransform: "none" }}
                  title={userInfo.name}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to={`/order/user/${userInfo._id}`}>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>

                  {/* <LinkContainer to="/shipping">
                    <NavDropdown.Item>Set shipping address</NavDropdown.Item>
                  </LinkContainer> */}

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="far fa-user"></i>
                    Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={adminIcon} id="admin_menu">
                  <LinkContainer to="/admin/userList">
                    <NavDropdown.Item>User List</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/productList">
                    <NavDropdown.Item>Product List</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/orderList">
                    <NavDropdown.Item>Order List</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
