
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Header } from '../../Home/Navbar/navbar';
import axios from 'axios';
import { API } from '../../Utils/Api';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons';

export const MyOrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    MyOrders();
  }, []);

  const MyOrders = async () => {
    try {
      const response = await axios.get(
        `${API}/api/orders/my-order/${localStorage.getItem('userId')}`,
        {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
        }
      );

      if (response.data.status) {
        console.log(response.data.data);
        setOrders(response.data.data);
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
          text: 'Orders cannot be fetched.!!!',
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
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col>
            <h1 className='text-center'>My Order Lists</h1>
          </Col>
        </Row>
        
        {Array.isArray(orders) && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id}>
               
              {order.cartsItems.map((cartItem) => (
                <Link key={order._id} to={`/view-order/${order._id}`}  className='links'>
               
                  <Row className='order-list m-3'>
                    <Col>
                      <Image
                        src={cartItem.product.ProductImageUrl}
                        height={50}
                        width={100}
                        rounded
                        alt={cartItem.product.ProductName}
                        className='m-1'
                      />
                    </Col>
                    <Col>
                      <p className='mt-3'>
                        <b>{cartItem.product.ProductName}</b>
                      </p>
                    </Col>
                    <Col>
                      <p className='mt-3'>
                        Quantity:<b>{cartItem.quantity}</b>
                      </p>
                    </Col>
                    <Col>
                      <p className='mt-3'>
                        <FontAwesomeIcon icon={faIndianRupee} />{' '}
                        <b>{cartItem.quantity * cartItem.product.Price}</b>
                      </p>
                    </Col>
                    <Col>
                      <p className='mt-3'>
                        Order Status:<b>{order.orderStatus}</b>
                      </p>
                    </Col>
                  </Row>
                </Link>
               
              ))}
               
            </div>
          ))
        ) : (
          <Row>
            <h1 className='text-center'>No Products found in the order list.</h1>
          </Row>
        )}
      </Container>
    </>
  );
};
