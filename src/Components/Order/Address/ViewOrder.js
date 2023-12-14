/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../../Utils/Api';
import Swal from 'sweetalert2';



export const ViewOrder = () => {
  const { id } = useParams();
  const [Order, setOrder] = useState([]);

  useEffect(() => {
    GetOrderDetails(id);
  }, [id]);

  const GetOrderDetails = async () => {
    try {
      const response = await axios.get(`${API}/api/orders/view-order/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        console.log(response.data);
        setOrder(response.data);
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
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please check it.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Container fluid>
      {Order && Order.data && (
        <>
          <Row>
            <Col>
              <h1 className='text-center'>View Order</h1>
            </Col>
          </Row>
          
              <h2>Product Details</h2>
              {Order.data.cartsItems.map((cartItem, index) => (
                <Row key={index} className='justify-content-center'>
                  <Col>
                    <Image
                      alt='Product'
                      src={cartItem.product.ProductImageUrl}
                      height={100}
                      rounded
                    />
                  </Col>
                  <Col>
                    <p>Product Name:<b>{cartItem.product.ProductName}</b></p>
                    <p>Quantity:<b>{cartItem.quantity}</b></p>
                    
                    
                  </Col>
                  <Col>
                   <p>Price:<b>{cartItem.quantity * cartItem.product.Price}</b></p>
                   <p>OrderStatus:<b>{Order.data.orderStatus}</b></p>
                  </Col>
                  <hr/>
                </Row>
                
              ))}
           
          <h2>Address</h2>
          <b>{Order.data.username}</b>
          <p>{Order.data.address}</p>
          <p>{Order.data.city},{Order.data.state},{Order.data.pincode}</p>
          <p>Phone:{Order.data.phone}</p>
          <Row className='justify-content-center m-1'>
            <Col xs='auto'>
              <Link to={'/myorder-list'}>
               <Button variant='danger'>Close</Button>
              </Link>
              
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

