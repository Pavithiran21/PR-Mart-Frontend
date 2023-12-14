/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from "yup";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { API } from "../../Utils/Api";
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupee} from '@fortawesome/free-solid-svg-icons';






export const  Editaddress = () => {
  const {id} = useParams();
  const [edit,setEdit] = useState([]);
  const [mycart, setMycart] = useState([]);
  const validate = yup.object({
    username: yup.string().min(4, 'Must be 5 characters or above').max(12,'Should not be more than 12 Characters').required('Username is required'),
    address: yup.string().max(50, "Address should be more than 50 characters").required("Address is required"),
    state: yup.string().min(3,"Address should be more than 3 characters").required("State is required"),
    country: yup.string().min(4,"Country should be more than 4 characters").required("Country is required"),
    city: yup.string().min(5, "City should be more than 5 characters").required("City is required"),
    phone: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, "Invalid Phone number").required('Phone Number is required'),
    pincode: yup.string().max(6,"pincode must be 6 digits").required("ZipCode is required")
  });

  const Navigate = useNavigate();







  const SubmitHandler = async (data) => {
    try {
      const cartsItems = mycart.map(cartItem => cartItem._id);
      data.cartsItems = cartsItems;
      const response = await axios.post(`${API}/api/orders/edit-order/${id}`, data,{
        headers: {
          authorization:window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        console.log(response);
        console.log(response.data);
        // Show a success message
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          Navigate(`/order-summary/${id}`);
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
      console.log(error);
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
    // AllCart();
    ViewAddress(id);
  }, []);

  //   try {
  //     const response = await axios.get(`${API}/api/cart/view-cart`, {
  //       headers: {
  //         authorization: window.localStorage.getItem('token'),
  //       },
  //     });
  //     console.log(response.data.data);

  //     if (response.data.status) {
  //       setMycart(response.data.data);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Success!',
  //         text: response.data.message,
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'OK',
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: response.data.message,
  //         confirmButtonColor: '#d33',
  //         confirmButtonText: 'OK',
  //       })
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Oops...',
  //       text: 'Something went wrong. Please check it.',
  //       confirmButtonColor: '#d33',
  //       confirmButtonText: 'OK',
  //     });
  //   }
  // };

  const ViewAddress = async (id) => {
    try {
      const response = await axios.get(`${API}/api/orders/view-order/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      console.log(response.data.data);

      if (response.data.status) {
        setEdit(response.data)
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
        })
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
    <>
      <Container fluid className="main-form">
        <Row>
          <h2 className="text-center text-white">Edit Order</h2>
        </Row>
        <Row>
          <Col>
            <div className="bg-white form-wrapper">
              {edit && edit.data && (
                  <Formik
                  initialValues={{
                    username:edit?.data?.username,
                    country:edit?.data?.country,
                    state:edit?.data?.state,
                    phone: edit?.data?.phone,
                    address:edit?.data?.address,
                    city:edit?.data?.city,
                    pincode:edit?.data?.pincode,
                  }}
                  validationSchema={validate}
                  onSubmit={(values) => {
                    console.log(values);
                    let data = {
                      username:values.username,
                      country:values.country,
                      state:values.state,
                      address:values.address,
                      phone:values.phone,
                      city:values.city,
                      pincode:values.pincode,
                    };
                    SubmitHandler(data);
                    
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="">
                     
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label>Username</label>
                            <Field
                              name="username"
                              type="text"
                              className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                              placeholder="Enter the Username"
                              required
                            />
                            {errors.username && touched.username && <div className="invalid-feedback">{errors.username}</div>}
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <label>Address</label>
                            <Field
                              name="address"
                              type="text"
                              component="textarea"
                              className={`form-control ${errors.address && touched.address ? 'is-invalid' : ''}`}
                              placeholder="Enter the Address"
                              required
                            />
                            {errors.address && touched.address && <div className="invalid-feedback">{errors.address}</div>}
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <label>Phone Number</label>
                            <Field
                              name="phone" 
                              type="number"
                              className={`form-control ${errors.phone && touched.phone ? 'is-invalid' : ''}`}
                              placeholder="Enter the Phone Number"
                              required
                            />
                            {errors.phone && touched.phone && <div className="invalid-feedback">{errors.phone}</div>}
                          </div>
                        </Col>
  
                        <Col>
                          <div className="form-group">
                            <label>City</label>
                            <Field
                              name="city"
                              type="text"
                              className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`}
                              placeholder="Enter the City"
                              required
                            />
                            {errors.city && touched.city && <div className="invalid-feedback">{errors.city}</div>}
                          </div>
  
                        </Col>
                        
                      </Row>
  
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label>Zip-Code</label>
                            <Field
                              name="pincode"
                              type="number"
                              className={`form-control ${errors.pincode && touched.pincode ? 'is-invalid' : ''}`}
                              placeholder="Enter the Postal Code"
                              required
                            />
                            {errors.pincode && touched.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
                          </div>
                        </Col>
                        <Col>
                          <div className="form-group">
                            <label>State</label>
                            <Field
                              name="state" 
                              type="text"
                              className={`form-control ${errors.state && touched.state ? 'is-invalid' : ''}`}
                              placeholder="Enter the State"
                              required
                            />
                            {errors.state && touched.state && <div className="invalid-feedback">{errors.state}</div>}
                          </div>
                        </Col>
                        
                        
                        <Col>
                          <div className="form-group">
                            <label>Country</label>
                            <Field
                              name="country" 
                              type="text"
                              className={`form-control ${errors.country && touched.country ? 'is-invalid' : ''}`}
                              placeholder="Enter the Country"
                              required
                            />
                            {errors.country && touched.country && <div className="invalid-feedback">{errors.country}</div>}
                          </div>
                        </Col>
                      </Row>
                      <hr/>
                      {mycart.map((products) => (
                        <div key={products._id}>
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
                          <hr />
  
                          
                        </div>
                      ))}
                      <div className="text-center">
                        <Button variant="success" type="submit" className="m-2">Add</Button>
                        <Button variant="danger" type="reset" className="m-2">Reset</Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};


