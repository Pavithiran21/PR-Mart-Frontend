import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Col, Image, Row } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from "../../Utils/Api";

export const Header = () => {
  const [count, setCount] = useState(0);
  const isTokenStored = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    window.location.href = '/';
  };

  const TotalCounts = async () => {
    try {
      const response = await axios.get(`${API}/api/cart/total-cart-products/${localStorage.getItem('userId')}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        setCount(response.data.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error fetching total count:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please check it.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    TotalCounts();
  }, []); // Fetch total count on component mount

 

  return (
    <Navbar style={{ background: "#1c8dbd" }} expand="lg" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="#" className="text-white">
          <Row>
            <Col>
              <Image src='https://www.pngall.com/wp-content/uploads/2016/06/Ecommerce-Download-PNG.png' alt='cart-image' width={70} />
            </Col>
            <Col className='mt-4'>
              <h2 style={{ fontFamily: "Pacifico, cursive", fontStyle: "oblique" }}>PR Mart</h2>
            </Col>
          </Row>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto mt-2">
            <Nav.Link href="/">
              <Button variant="outline-light">HOME</Button>
            </Nav.Link>
            {isTokenStored ? (
              <>
              <Nav.Link href="/myorder-list">
                <Button variant="outline-light">My Orders</Button>
              </Nav.Link><Nav.Link href="/">
                  <Button variant="outline-light" onClick={handleLogout}>LOGOUT</Button>
                </Nav.Link></>
            ) : (
              <Nav.Link href="/login">
                <Button variant="outline-light">SIGN IN</Button>
              </Nav.Link>
            )}
            <Nav.Link href="/view-cart" className="d-flex align-items-center">
              <FontAwesomeIcon
                className='mt-2'
                icon={faShoppingCart}
                style={{ color: 'white' }}
              />
              <Badge pill bg="danger" className="flex-shrink-0">
                {count}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

