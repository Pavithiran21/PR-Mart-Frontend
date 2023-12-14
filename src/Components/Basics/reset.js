// import React from 'react'
// import Container from 'react-bootstrap/Container';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import {Formik,Form,Field} from 'formik';
// import * as yup from 'yup';
// import axios from 'axios';
// // import useNavigate from 'react-router-dom';

// export const Reset = () => {

//   const validate =  yup.object({
//     password: yup.string().min(6, "Password must be at least 6 charaters").required("Password is required"),
//     confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Password must match").required("Confirm password is required"),
//   });

//   // const Navigate = useNavigate();

//   const SubmitHandler = async(values) =>{
//     try{
//       let Data = axios.get(``,values.password,
//       values.confirmPassword);
//       window.alert("Password Reseted Successfully.Please Login to continue");
//       console.log(Data);
//       // Navigate("/");
//     }
//     catch{
//       window.alert("Email already exists")
//     }
    
    
//   }





//   return (
//     <>
//       <Container fluid className='main-form' >
//         <Row>
//           <Col>
//             <div className='m-auto p-auto bg-white'>
         
//               <Formik 
//                 initialValues={{ password:'', confirmPassword:''}}
//                 validationSchema = {validate}
//                 onSubmit = {values =>{
//                 console.log(values);
//                 let data = {
                  
//                   password:values.password,
//                   confirmPassword:values.confirmPassword
//                 };
//                 SubmitHandler(data);
//                 }}
//               >
//               {({ errors, touched  }) => (
//                 <Form className='form-group m-auto'>
//                   <h2 className='text-center'>RESET PAGE</h2>

//                   <label className='ml-2'>Password</label>
//                   <Field name="password" type="password" className="input-value ml-3" placeholder="Enter the Password" required /><br></br>
//                   {errors.password && touched.password ? (<div className='error'>{errors.password}</div> ): null}
                  

//                   <label className='ml-2'>Confirm Password</label>
//                   <Field name="confirmPassword" className="input-value ml-3" type="password" placeholder="Enter the Confirm Password" required/><br></br>
//                   {errors.confirmPassword && touched.confirmPassword ? (<div className='error'>{errors.confirmPassword}</div> ): null}
                  

                

                  
//                   <div className='p-2 '>
//                     <button type="submit" className='btn btn-success m-3'>Reset</button>
//                   </div>
                  
//                 </Form>
//               )}
              

              
//               </Formik>

//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   )
// }


import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../Utils/Api';

export const Reset = () => {
  const validate = yup.object({
    password: yup.string().min(6, 'Password must be at least 6 characters').max(12,'Password should be more than 12 characters.Enter valid Password').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match').required('Confirm password is required'),
  });
  const navigate = useNavigate();
  const { resetToken } = useParams();
  const SubmitHandler = async (data) => {
    try {
      // Replace the empty string with your API endpoint to send the form data
      let response = await axios.put(`${API}/api/users/reset/${resetToken}`, data);
      console.log(response);
  
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
    <>
      <Container fluid className="main-form d-flex align-items-center justify-content-center">
        <Row>
          <Col>
           <h1 className='text-white text-center'>PR-Mart</h1>
            <div className="bg-white form-wrapper">
              <Formik
                initialValues={{ password: '', confirmPassword: '' }}
                validationSchema={validate}
                onSubmit={(values) => {
                  console.log(values);
                  let data = {
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                  };
                  SubmitHandler(data);
                }}
              >
                {({ errors, touched }) => (
                  <Form className="signup-form">
                    <h2 className="text-center">RESET PASSWORD</h2>

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
                  <div className="text-center ">
                    <Button variant="primary" type='submit' className='m-2'>Submit</Button>
                    <Button variant='danger' type='reset' className=''>Reset</Button>
                  </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

