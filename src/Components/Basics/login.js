import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';
import { API } from '../Utils/Api';



export const Login = () => {
  const validate = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').max(12,'Password should be more than 12 characters.Enter valid Password').required('Password is required'),
  });


  

  const navigate = useNavigate();
  
  const SubmitHandler = async (data) => {
    try {
    
      const response = await axios.post(`${API}/api/users/login`, data);
  
      if (response.data.status) {
        window.localStorage.setItem('userId',response.data.data._id);
        window.localStorage.setItem('token', response.data.user_token);
        window.localStorage.setItem('username',response.data.data.username);
        if (response.data.data.isAdmin){
          console.log(response.data.data.isAdmin);
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text:"Admin LoggedIn SuccessFully!!!",
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          console.log(response.data)
          navigate("/admin-dashboard");
        });
        }
        else if(!response.data.data.isAdmin){
          console.log(response.data.data.isAdmin)
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          console.log(response.data)
          navigate("/");
        });
       }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Cannot login. Please check the details....",
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });

        }
      }
      else {
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
    <>
      <Container fluid className="main-form d-flex align-items-center justify-content-center">
      <Row>
        <h1 className='text-white text-center'>PR-Mart</h1>
        <Col>
         
          <div className="bg-white form-wrapper">
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                console.log(values);
                let data = {
                  email: values.email,
                  password: values.password,
                };
                
                SubmitHandler(data);
              }}
            >
              {({ errors, touched }) => (
                <Form className="signup-form">
                  <h2 className="text-center">SIGN IN</h2>

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

                  <div style={{textAlign:"right"}}>
                    <p><a href="/forgot" className='error'style={{textDecoration:"none"}}>Forgot Password? </a></p>
                  </div>

                 
                  <div className="text-center">
                    
                    <Button variant="primary" type='submit' className='m-1'>Submit</Button>
                    <Button variant='warning' type='reset' className=''>Reset</Button>
                    
                  </div>
                  
                  

                  <p className="text-center">
                    Not Registered? <a href="/register" className="success" style={{textDecoration:"none"}}>Click here to Sign Up</a>
                  </p>
                </Form>
              )}
            </Formik>
            
          </div>
      
        </Col>
        <Col>
        <div className='bg-white form-wrapper text-center'>
                <p>Admin and User Credetionals</p>
                <p><b> For Admin</b>:
                 <p>Email:admin@21gmail.com</p>
                 <p>Password:123456</p>
                
                </p> 
                <p><b> For User </b>:
                 <p>Email:user@21gmail.com</p>
                 <p>Password:123456</p>
                 
                
                </p> 
      </div>
        </Col>
      </Row>
    </Container>
    </>
    
  );
};
