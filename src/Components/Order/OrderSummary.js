/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faIndianRupee} from '@fortawesome/free-solid-svg-icons';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API, KEY_ID, KEY_SECRET } from '../Utils/Api';

export const OrderSummary = () => {
  const {id } = useParams();
  
  const [Order, Setorder] = useState([]);
  const navigate = useNavigate();


  const SummaryHandler = async () => {
    try {
      const response = await axios.get(`${API}/api/orders/order-summary/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      console.log(response);
      if (response.data.status) {
        Setorder(response.data);
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
          text: 'Product cannot be viewed.!!!',
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

  useEffect(() => {
    SummaryHandler(id);
  }, []);




  const calculateTotalPrice = () => {
    return Order.data.cartsItems.reduce((total, product) => {
      const itemPrice = product.product.Price; 
      const itemQuantity = product.quantity || 1; 
      return total + itemPrice * itemQuantity;
    }, 0);
  };


  const MarkasPurchasedCart = () =>{
    axios.get(`${API}/api/cart/purchased-from-cart/${localStorage.getItem("userId")}`,{
      headers: {
        authorization:window.localStorage.getItem('token'),
      },
    })
    .then((response)=>{
      console.log(response);
      if(response.data.status){
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Delete cannot be found.",
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      }
    })
    .catch((error)=>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please check it.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });
    })


  }


  const initiatePayment = async (e) => {
    try {
      e.preventDefault();
      const options = {
        key:KEY_ID, 
        secret:KEY_SECRET,
        amount:calculateTotalPrice() * 100,
        currency:'INR',
        name: 'E-com Shopping App',
        description: 'Product Purchase',
        handler: function (response) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text:`your Payment is Completed Successfully, Your tranction Id ${response.razorpay_payment_id}`,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
          console.log(response.razorpay_payment_id);
          MarkasPurchasedCart();
          navigate("/");

          
        },
        prefill: {
          name: Order.data.username,
          email: Order.data.email,
          contact: Order.data.phone,
        },
        theme: {
          color: '#528FF0',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };


  return (
    <Container fluid>
      {Order && Order.data && (
        <>
          <Row>
            <Col>
              <h1 className='text-center'>Order Summary</h1>
            </Col>
          </Row>
          <Row>
            <h2>Address</h2>
          
            <Col>
              
              <b>{Order.data.username}</b>
              <p>{Order.data.address},{Order.data.city},{Order.data.state},{Order.data.country},{Order.data.pincode}</p>
              <p>Phone:{Order.data.phone}</p>
              
            </Col>

              
            
          </Row>
           <hr/>
          <Row>
          <h2>Products to be Pay</h2>
            <Col>
              {Order.data.cartsItems.map((products) => (
                <Card key={products._id} className='mb-3'>
                  <Card.Body>
                    <Row className=''>
                      <Col sm={3} md={3} lg={3}>
                        <div className='text-center'>
                          <Image src={products.product.ProductImageUrl} alt={products.product.ProductName} height={40} width={60} rounded />
                        </div>
                      </Col>
                      <Col sm={3} md={3} lg={3}>
                        <div className='d-flex flex-row '>
                          <p><b>Product Name:&nbsp;</b></p>
                          {products.product.ProductName}
                        </div>
                      </Col>
                      <Col sm={3} md={3} lg={3}>
                        <div className='d-flex flex-row'>
                          <p><b>Quantity:&nbsp;</b></p>
                          {products.quantity}
                        </div>
                      </Col>
                      <Col sm={3} md={3} lg={3}>
                        <div className='d-flex flex-row'>
                          <p><b>Price:&nbsp;</b></p>
                          <FontAwesomeIcon icon={faIndianRupee} style={{ fontSize: '12px' }} className='mt-2' />
                          <span className='mx-1'>{products.product.Price * products.quantity}</span>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>

          <Row>
            <Col>
              <p>Total Amount:</p>
            </Col>
            <Col>
              <p style={{ float: 'right' }}>
                <FontAwesomeIcon icon={faIndianRupee} className='' />&nbsp;
                <b><span style={{ fontSize: '18px' }}>{calculateTotalPrice()}</span></b>
              </p>
            </Col>
          </Row>
          

          <Row className='m-3'>
            <Col className='text-center'>
              <Button variant='outline-success' onClick={(e) => initiatePayment(e)}>Pay Now</Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};




