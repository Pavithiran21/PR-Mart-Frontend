/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API } from '../Utils/Api';



export const Signup = () => {
  const validate = yup.object({
    firstname: yup.string().min(6, 'Must be 6 characters or above').max(10,'Should not be more than 10 Characters').required('Firstname is required'),
    lastname: yup.string().min(6, 'Must be 6 characters or above').max(10,'Should not be more than 10 Characters').required('Lastname is required'),
    username: yup.string().min(4, 'Must be 5 characters or above').max(12,'Should not be more than 12 Characters').required('Username is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(12,'Password should not be  more than 12 characters.Enter valid Password').required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Password does not  match')
      .required('Confirm password is required'),
  });

  const navigate = useNavigate();

  
  const SubmitHandler = async (data) => {
    try {
      
      const response = await axios.post(`${API}/api/users/register`, data);

      if (response.data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          console.log(response.data)
          navigate("/login");
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
    } 
    catch (error) {
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


  return (
    <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <Col>
         <h1 className='text-white text-center'>PR-Mart</h1>
          <div className="bg-white form-wrapper ">
            <Formik
              initialValues={{
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                console.log(values);
                let data = {
                  firstname: values.firstname,
                  lastname: values.lastname,
                  username: values.username,
                  email: values.email,
                  password: values.password,
                  confirmPassword: values.confirmPassword,
                };
                SubmitHandler(data);
               
                
              }}
            >
              {({ errors, touched }) => (
                <Form className="signup-form" >
                  <h2 className="text-center">SIGN UP</h2>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label className='text-left'>Firstname</label>
                        <Field
                          name="firstname"
                          className={`form-control ${errors.firstname && touched.firstname ? 'is-invalid' : ''}`}
                          type="text"
                          placeholder="Enter the Firstname"
                          required
                        />
                        {errors.firstname && touched.firstname && (
                          <div className="invalid-feedback">{errors.firstname}</div>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group">
                        <label>Lastname</label>
                        <Field
                          name="lastname"
                          className={`form-control ${errors.lastname && touched.lastname ? 'is-invalid' : ''}`}
                          type="text"
                          placeholder="Enter the Lastname"
                          required
                        />
                        {errors.lastname && touched.lastname && (
                          <div className="invalid-feedback">{errors.lastname}</div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  
                    <div className="form-group">
                    <label>Username</label>
                    <Field
                      name="username"
                      className={`form-control ${errors.username && touched.username ? 'is-invalid' : ''}`}
                      type="text"
                      placeholder="Enter the Username"
                      required
                    />
                    {errors.username && touched.username && (
                      <div className="invalid-feedback">{errors.username}</div>
                    )}
                  </div>
                    
                 

                

                  <div className="form-group">
                    <label>Email</label>
                    <Field
                      name="email"
                      type="email"
                      className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                      placeholder="Enter the Email"
                      required
                    />
                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                      placeholder="Enter the Password"
                      required
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''
                      }`}
                      placeholder="Enter the Confirm Password"
                      required
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="invalid-feedback">{errors.confirmPassword}</div>
                    )}
                  </div>

                  <div className="text-center">
                   
                    <Button variant="primary" type='submit' className='m-1'>Submit</Button>
                    <Button variant='danger' type='reset' className='m-1'>Reset</Button>
                  </div>

                  <p className="text-center">
                    Already Registered? <a href="/login" className="success" style={{textDecoration:"none"}}>Click here to Login</a>
                  </p>
                </Form>
                
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};



