/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import axios from 'axios';

import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { API } from '../../Utils/Api';


export const Cart = () => {
  const navigate = useNavigate();
  const [mycart, setMycart] = useState([]);
  const [productQuantities, setProductQuantities] = useState({});



  const DeleteCart = (id) =>{
    axios.delete(`${API}/api/cart/delete-cart/${id}`,{
      headers: {
        authorization:window.localStorage.getItem('token'),
      },
    })
    .then((response)=>{
      console.log(response)
      console.log(id);
      if(response.data.status){
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(()=>{
          AllCart();
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


  const incrementQuantity = (id) => {
    axios.get(`${API}/api/cart/increment/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.data.status) {
          console.log(response.data);
          setMycart((prevMycart) =>
            prevMycart.map((products) =>
              products._id === id
                ? { ...products, quantity: (products.quantity || 1) + 1 }
                : products
            )
          );
          setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: (prevQuantities[id] || 1) + 1,
          }));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
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

  const decrementQuantity = (id) => {
    axios.get(`${API}/api/cart/decrement/${id}`, {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.data.status) {
          setMycart((prevMycart) =>
            prevMycart.map((product) =>
              product._id === id
                ? { ...product, quantity: Math.max((product.quantity || 1) - 1, 1) }
                : product
            )
          );
          setProductQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max((prevQuantities[id] || 1) - 1, 1),
          }));
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
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
  

  const calculateTotalPrice = () => {
    return mycart.reduce((total, product) => {
      const itemPrice = product.product.Price; 
      const itemQuantity = product.quantity || 1; 
      return total + itemPrice * itemQuantity;
    }, 0);
  };
  
  

  useEffect(() => {
    AllCart();
  }, []);

  const AllCart = async () => {
    const userId = window.localStorage.getItem('userId');
    try {
      const response = await axios.get(`${API}/api/cart/view-cart/${userId}`,{
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      console.log(response.data.data);

      if (response.data.status) {
        setMycart(response.data.data);
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
        }).then(() => {
          navigate('/');
        });
      }
    } catch (error) {
      console.error(error);
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
      <Row>
        <Col>
          <h1 className='text-center'>My Cart</h1>
        </Col> 
      </Row>
      {Array.isArray(mycart) && mycart.length > 0 ? (
        mycart.map((products, index) => (
          <div key={index}>
            <Row className='mt-2'>
              <Col>
                <div className='justify-content-center'>
                  <Image src={products.product.ProductImageUrl} alt={products.product.ProductName} height={150} width={300} rounded />
                </div>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <div className='d-flex flex-row m-2'>
                      <h5> Product Name:&nbsp; </h5>
                      <p style={{ fontSize: '18px' }}>{products.product.ProductName}</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className='d-flex flex-row'>
                      <h5> Quantity: &nbsp; </h5>
                      <Button variant='outline-danger' onClick={() => decrementQuantity(products._id)}>
                        -
                      </Button>
                      <InputGroupText className='mx-2'>{products.quantity}</InputGroupText>
                      <Button variant='outline-primary'  onClick={() => incrementQuantity(products._id)}>
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col>
                    <div className='d-flex flex-row'>
                      <h5> Price:</h5>
                      <FontAwesomeIcon icon={faIndianRupee} style={{ fontSize: '14px' }} className='p-2' />
                      <p style={{ fontSize: '18px' }}>
                       <span className='mx-2'>{products.product.Price * products.quantity}</span>
                      </p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col>
                   
                      <div className='m-1' onClick={() => DeleteCart(products._id)}>
                        <Button variant='danger '>
                          <FontAwesomeIcon icon={faTrash} /> 
                          &nbsp;Remove
                        </Button>
                      </div>
                    
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />

            
          </div>
        ))

        
      ) : (
        <h1 className='text-center'>No items in the cart.</h1>
      )}
     
      {Array.isArray(mycart) && mycart.length > 0 && (
        <Row>
          <div className=''>
            <Row>
              <h5>Price Details</h5>
            </Row>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <p>Price :</p>
                  </Col>
                  <Col>
                    <p style={{ float: 'right' }}>
                      <FontAwesomeIcon icon={faIndianRupee} className='' />&nbsp;
                      <span style={{ fontSize: '18px' }}>{calculateTotalPrice()}</span> 
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Delivery Charges :</p>
                  </Col>
                  <Col>
                    <p style={{ float: 'right' }} className='text-success'>&nbsp;Free</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Total Price :</p>
                  </Col>
                  <Col>
                    <p style={{ float: 'right' }}>
                      <FontAwesomeIcon icon={faIndianRupee} className='' />&nbsp;
                      <span style={{ fontSize: '18px' }}>{calculateTotalPrice()}</span> {/* Use mycart.totalPrice */}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='m-1'>
                  <Link to={"/"}><Button variant='primary'>Back</Button></Link>
                  <Link to={"/address"}> 
                    <Button variant='warning' style={{ float: 'right' }}>
                      Place Order
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </Row>
      )}

      
    </Container>
    
  )
};


