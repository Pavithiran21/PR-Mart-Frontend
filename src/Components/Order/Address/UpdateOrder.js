// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import { Button, Col, Container, Image, Row } from 'react-bootstrap';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { API } from '../../Utils/Api';
// import { Field, Form, Formik } from 'formik';
// import * as yup from "yup";

// export const UpdateOrder = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState([]);

//   const validate = yup.object({
//     orderStatus: yup.string().min(4, 'Select the OrderStatus to update it.').required('OrderStatus is required')
//   });;

//   useEffect(() => {
//     getOrderDetails(id);
//   }, [id]);

//   const getOrderDetails = async () => {
//     try {
//       const response = await axios.get(`${API}/api/orders/view-order/${id}`, {
//         headers: {
//           authorization: window.localStorage.getItem('token'),
//         },
//       });

//       if (response.data.status) {
//         setOrder(response.data);
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: response.data.message,
//           confirmButtonColor: '#3085d6',
//           confirmButtonText: 'OK',
//         });
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: response.data.message,
//           confirmButtonColor: '#d33',
//           confirmButtonText: 'OK',
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong. Please check it.',
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   const handleUpdateOrderStatus = async () => {
//     try {
//       const response = await axios.put(
//         `${API}/api/orders/update-order-status/${id}`,
//         {
//           headers: {
//             authorization: window.localStorage.getItem('token'),
//           },
//         }
//       );
//       console.log(response);

//       if (response.data.status) {
//         console.log(response.data)
//         Swal.fire({
//           icon: 'success',
//           title: 'Success!',
//           text: response.data.message,
//           confirmButtonColor: '#3085d6',
//           confirmButtonText: 'OK',
//         });
//         getOrderDetails(); // Refresh order details after updating status
//       } else {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: response.data.message,
//           confirmButtonColor: '#d33',
//           confirmButtonText: 'OK',
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Something went wrong. Please check it.',
//         confirmButtonColor: '#d33',
//         confirmButtonText: 'OK',
//       });
//     }
//   };

//   return (
//     <Container fluid>
//       {order && order.data && (
//         <>
//           <Row>
//             <Col>
//               <h1 className='text-center'>View Order</h1>
//             </Col>
//           </Row>
//           <h2>Product Details</h2>
//           {order.data.cartsItems.map((cartItem, index) => (
//             <Row key={index} className='justify-content-center'>
//               <Col>
//                 <Image alt='Product' src={cartItem.product.ProductImageUrl} height={100} rounded />
//               </Col>
//               <Col>
//                 <p>
//                   Product Name:<b>{cartItem.product.ProductName}</b>
//                 </p>
//                 <p>
//                   Quantity:<b>{cartItem.quantity}</b>
//                 </p>
//               </Col>
//               <Col>
//                 <p>
//                   Price:<b>{cartItem.quantity * cartItem.product.Price}</b>
//                 </p>
//                 <p>
//                   OrderStatus:<b>{order.data.orderStatus}</b>
//                 </p>
//               </Col>
//               <hr />
//             </Row>
//           ))}
//           <h2>Address</h2>
//           <b>{order.data.username}</b>
//           <p>{order.data.address}</p>
//           <p>
//             {order.data.city},{order.data.state},{order.data.pincode}
//           </p>
//           <p>Phone:{order.data.phone}</p>
//           <Row className='justify-content-center m-1'>
//             <Formik
//              initialValues={{
//                 orderStatus:order?.data?.orderStatus,
                
//               }}
//               validationSchema={validate}
//               onSubmit={(values) => {
//                 console.log(values);
//                 let data = {
//                     orderStatus:values.orderStatus,
                  
//                 };
//                 handleUpdateOrderStatus(data);
               
                
//               }}
//             >
//             {({ errors, touched }) => (
                
//                 <Form>
//                      <Row>
//                      <div >
//                    <label>Order Status</label>
//                    <Field  name="orderStatus" as="select"  className={`form-control  ${errors.orderStatus && touched.orderStatus ? 'is-invalid' : ''}`} required>
//                      <option>Select OrderStatus</option>
//                      <option value="Processing">Processing</option>
//                      <option value="Ordered">Ordered</option>
//                      <option value="Shipped">Shipped</option>
//                      <option value="Delievered">Delievered</option>
//                    </Field>
//                    {errors.orderStatus && touched.orderStatus && <div className="invalid-feedback">{errors.orderStatus}</div>}
//                  </div>
//                      </Row>
//                      <Row>
//                      <div className="text-center">
//                         <Button variant="success" type="submit" className="m-2">Update</Button>
                        
//                       </div>
//                      </Row>

//                 </Form>
               
                    
                
                 
            
//             )}
               
                  

//             </Formik>
          
//           </Row>
//         </>
//       )}
//     </Container>
//   );
// };




/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../../Utils/Api';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';

export const UpdateOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  const validate = yup.object({
    orderStatus: yup.string().min(4, 'Select the OrderStatus to update it.').required('OrderStatus is required'),
  });

  useEffect(() => {
    getOrderDetails(id);
  }, [id]);

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(`${API}/api/orders/view-order/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
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

  const handleUpdateOrderStatus = async (data) => {
    try {
      const response = await axios.put(`${API}/api/orders/update-order-status/${id}`,data,{
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        });
        getOrderDetails(); // Refresh order details after updating status
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
      {order && order.data && (
        <>
          <Row>
            <Col>
              <h1 className="text-center">View Order</h1>
            </Col>
          </Row>
          <h2>Product Details</h2>
          {order.data.cartsItems.map((cartItem, index) => (
            <Row key={index} className="justify-content-center">
              <Col>
                <Image alt="Product" src={cartItem.product.ProductImageUrl} height={100} rounded />
              </Col>
              <Col>
                <p>
                  Product Name:<b>{cartItem.product.ProductName}</b>
                </p>
                <p>
                  Quantity:<b>{cartItem.quantity}</b>
                </p>
              </Col>
              <Col>
                <p>
                  Price:<b>{cartItem.quantity * cartItem.product.Price}</b>
                </p>
                <p>
                  OrderStatus:<b>{order.data.orderStatus}</b>
                </p>
              </Col>
              <hr />
            </Row>
          ))}
          <h2>Address</h2>
          <b>{order.data.username}</b>
          <p>{order.data.address}</p>
          <p>
            {order.data.city},{order.data.state},{order.data.pincode}
          </p>
          <p>Phone:{order.data.phone}</p>
          <Row className="justify-content-center m-1">
            <Formik
              initialValues={{
                orderStatus: order?.data?.orderStatus,
              }}
              validationSchema={validate}
              onSubmit={(values) => handleUpdateOrderStatus(values)}
            >
              {({ errors, touched }) => (
                <Form>
                  <Row>
                    <div>
                      <label>Order Status</label>
                      <Field
                        name="orderStatus"
                        as="select"
                        className={`form-control  ${errors.orderStatus && touched.orderStatus ? 'is-invalid' : ''}`}
                        required
                      >
                        <option>Select OrderStatus</option>
                        <option value="Processing">Processing</option>
                        <option value="Ordered">Ordered</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </Field>
                      {errors.orderStatus && touched.orderStatus && (
                        <div className="invalid-feedback">{errors.orderStatus}</div>
                      )}
                    </div>
                  </Row>
                  <Row>
                    <div className="text-center">
                      <Button variant="success" type="submit" className="m-2">
                        Update
                      </Button>
                    </div>
                  </Row>
                </Form>
              )}
            </Formik>
          </Row>
        </>
      )}
    </Container>
  );
};
