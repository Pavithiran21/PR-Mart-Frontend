
import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from "react-bootstrap/esm/Button";
import { Col, Image, Row } from "react-bootstrap";


export const AdminNavbar = () =>{

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/'; 
  };
  
  
  
  
  
  
    
  return(
      
      
    <Navbar  collapseOnSelect  bg="danger" variant="danger"   expand="lg" sticky='top' >
        <Container fluid>
          <Navbar.Brand href="/" className="text-white">
          <Row>
        <Col>
          <Image src='https://www.pngall.com/wp-content/uploads/2016/06/Ecommerce-Download-PNG.png' width={70}/>

        </Col>
        <Col className='mt-4'>
          <h2 style={{fontFamily:"Pacifico,cursive",fontStyle:"oblique"}}>PR Mart</h2>
        </Col>
      </Row>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav ">
            <Nav  className="ms-auto">
              <Nav.Link href="/admin-dashboard"><Button variant="outline-light">DASHBOARD</Button></Nav.Link>
              <Nav.Link href="/admin/list-users" className=""><Button variant="outline-light">USERS</Button></Nav.Link>
              <Nav.Link href="/admin/list-products" className=""><Button variant="outline-light">PRODUCTS</Button></Nav.Link>
              <Nav.Link href="/admin/list-orders"><Button variant="outline-light">ORDERS AND STATUS</Button></Nav.Link>
              <Nav.Link onClick={handleLogout}><Button variant="outline-light">LOGOUT</Button></Nav.Link>          
            </Nav>

            
            
          </Navbar.Collapse>
        </Container>

    </Navbar>
  )
}





