import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { AdminNavbar } from '../Navbar/navbar';
import '../Admin.css'; 

import Swal from 'sweetalert2';
import { API } from '../../Utils/Api';




export const AdminDashboard = () => {
    const [username, setUsername] = useState();
    const [totalproduct, setTotalProduct] = useState();
    const [totalorder, setTotalOrder] = useState();
    const [orderdeliver, setOrderDeliver] = useState();
    const [totaluser, setTotalUser] = useState();
  
    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }, []);


    const DashboardData = () => {
        
          axios.get(`${API}/api/users/admin-dashboard`, {
            headers: {
              authorization: window.localStorage.getItem('token'),
            },
          })
          .then((response) => {
            const {totalproduct,totalorder,orderdeliver,totaluser} = response.data.data;
            console.log(response.data.data)
            setTotalProduct(totalproduct);
            setTotalOrder(totalorder);
            setOrderDeliver(orderdeliver);
            setTotalUser(totaluser);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data.message,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
              }).then(() => {
                console.log(response.data)
               
            });
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please check it.',
                confirmButtonColor: '#d33',
                confirmButtonText: 'OK',
              });
          });
      };
      useEffect(() => {
       DashboardData()
      }, []);


  return (
    <>
        <AdminNavbar/>
        <Container fluid className="seller"> 
            <Row>    
                <Col sm={12}><h1 className='text-center'>Dashboard</h1> </Col>
                <Col sm={12}><p className='text-center text'> Hello  <b>{username}</b>,Welcome to the Admin Dashboard</p></Col>
            </Row>
            <Row>
                <Col sm={3} className='m-auto p-3'>
                    <Card className='text-center'>
                        <Card.Body>
                            <Card.Title>
                                <h5>Number of Products</h5>
                            </Card.Title>
                            <Card.Text>
                             <span style={{fontSize:"45px"}} className='text-primary'><b>{totalproduct}</b></span>
                            </Card.Text>
                        </Card.Body>

                    </Card>
                </Col>
                <Col sm={3} className='m-auto p-3'>
                    <Card className='text-center' >
                        <Card.Body>
                            <Card.Title>
                                <h5 className="text-center">No of Orders Placed</h5>
                            </Card.Title>
                            <Card.Text>
                             <span style={{fontSize:"45px"}} className='text-warning'><b>{totalorder}</b></span>
                            </Card.Text>
                        </Card.Body>

                    </Card>  
                </Col>
                <Col sm={3} className='m-auto p-3'>
                    <Card className='text-center' >
                        <Card.Body>
                            <Card.Title>
                                <h5 className="text-center">No of Orders Delivered</h5>
                            </Card.Title>
                            <Card.Text>
                             <span style={{fontSize:"45px"}} className='text-success'><b>{orderdeliver}</b></span>
                            </Card.Text>
                        </Card.Body>

                    </Card>  
                </Col>
                <Col sm={3} className='m-auto p-3'>
                    <Card className='text-center' >
                        <Card.Body>
                            <Card.Title>
                                <h5 className="text-center">No of Users registered</h5>
                            </Card.Title>
                            <Card.Text>
                             <span style={{fontSize:"45px"}} className='text-danger'><b>{totaluser}</b></span>
                            </Card.Text>
                        </Card.Body>

                    </Card>  
                </Col>
                
            </Row>
        </Container>
    </>
)
}
