import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik,Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../Utils/Api';


export const Activate = () => {

  const navigate = useNavigate();
  const  {activeToken}  = useParams();
  const [activationStatus, setActivationStatus] = useState(null);

  const SubmitHandler = async (data) => {
    
    try {
      if (!activeToken) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:'Activation token missing. Please check your activation link.' ,
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
        return;
      }
      // Replace the empty string with your API endpoint to send the form data
      let response = await axios.get(`${API}/api/users/activate/${activeToken}`, data);
  
      if (response.data.status) {
        setActivationStatus(true);
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
        setActivationStatus(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
        navigate("/register");
      }
    } 
    catch (error) {
      console.log(error);
      setActivationStatus(false);
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
       <Container fluid className='main-form d-flex align-items-center justify-content-center'>
         <Row>
            <Col>
              <h1 className='text-white text-center'>PR-Mart</h1>
              <div className='bg-white form-wrapper'>
                <div className='m-3'>
                  {activationStatus === true ?(
                    <div className='text-center'>
                      <p>Your account has been successfully activated.</p>
                      <p>You can now log in using your credentials.</p>
                    </div>
                  ):(
                    <Formik 
                      initialValues={{}}
                      onSubmit = {SubmitHandler}
                      
                    >
                      {({handleSubmit})=>(
                        <Form className='signup-form'>
                          <h2  className='text-center'>ACTIVATION ACCOUNT</h2>
                          <p  className='text-danger text-center'>Please activate your email</p>
                          <div className='text-center'>
                          <button type='submit' className='btn btn-primary' onClick={handleSubmit}>Click to Activate Account</button>
                          </div>
                        </Form>

                      )}
                  
                      
                  
                  
          
                  
                  </Formik>
                  )}

                  {activationStatus === false && (
                    <div className='text-center'>
                      <p>Activation failed. Please check your activation link or try again later.</p>
                    </div>
                  )}

                </div>
              
                  
      
              </div>
            </Col>
         </Row>
       </Container>
    </>
    
  )
}






