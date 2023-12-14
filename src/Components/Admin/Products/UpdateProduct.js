/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { API } from "../../Utils/Api";
import { AdminNavbar } from "../Navbar/navbar";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { editProduct } from "../Redux/Reducer/productSlice";



export const UpdateProduct= () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Edit,setEdit] = useState();
  

  const validate = yup.object({
    ProductImageUrl: yup.string().required("Product Image is required"),
    ProductName: yup.string().required("Product Name is required"),
    Category: yup.string().required("Product Category is required"),
    Description: yup.string().max(300, "Must be 300 characters or less").min(50,"Must be 50 characters or more").required("Product Description is required"),
    Quantity: yup.number().required("Product Quantity is required"),
    Price: yup.number().required("Product Price is required"),
  });

  
  const fetchDetails = async(id)=>{
    try{
      if(id){
        let response = await axios.get(`${API}/api/products/view-product/${id}`,{
            headers: {
                authorization: window.localStorage.getItem('token'),
            },
        });
        console.log(response.data.data);
        setEdit(response.data.data);
        dispatch(editProduct(response.data.data))
        // setEdit(response.data.data)
        // dispatch(editProduct(response.data.data));
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
          
        });

      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text:"Product cannot be viewed.!!!",
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });

      }
        

    }
    catch(err){
        console.log(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong. Please check it.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });

    }
  
}

useEffect(()=>{
    fetchDetails(id)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const SubmitHandler = (data) => {
      axios.put(`${API}/api/products/edit-product/${id}`, data, {
        headers: {
          authorization:window.localStorage.getItem('token'),
        },
      })
        .then((response) => {
          console.log(response.data.data);
          if(response.data.status){
              Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: response.data.message,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'OK',
                }).then(() => {
                  console.log(response.data.data);
                  console.log(response.data.data._id)
                  navigate('/admin/list-products');
              });
          }
          
          else{
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: "Product cannot updated!!!. Please check it..",
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



  

  return (
    <>
      <AdminNavbar/>
      <Container fluid className="seller">
        <Row className="justify-content-center">
          <h1 className='text-center'>Update Product</h1>
        </Row>
        <Row>
          <Col>
            
              

              <div className="bg-white form-wrapper">
              {Edit &&(
                <Formik
                initialValues={{
                  ProductImageUrl:Edit?.ProductImageUrl,
                  ProductName:Edit?.ProductName,
                  Category:Edit?.Category,
                  Description:Edit?.Description,
                  Quantity: Edit?.Quantity,
                  Price:Edit?.Price,
                  
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                  console.log(values);
                  let data = {
                    ProductImageUrl: values.ProductImageUrl,
                    ProductName: values.ProductName,
                    Category: values.Category,
                    Description: values.Description,
                    Quantity: values.Quantity,
                    Price: values.Price,
                  };
                  SubmitHandler(data);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>Product Image</label>
                        <Field
                          name="ProductImageUrl"
                          className={`form-control ${ errors.ProductImageUrl && touched.ProductImageUrl ? "is-invalid": ""}`}
                          type="text"
                          placeholder="Add Image Url"
                          required
                        />
                        {errors.ProductImageUrl && touched.ProductImageUrl && (
                          <div className="invalid-feedback">{errors.ProductImageUrl}</div>
                        )}
                      </div>
                    </Col>
                   
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>Product Name</label>
                        <Field
                          name="ProductName"
                          className={`form-control ${ errors.ProductName && touched.ProductName ? "is-invalid" : ""}`}
                          type="text"
                          placeholder="Enter the Product Name"
                          required
                        />
                        {errors.ProductName && touched.ProductName && (
                          <div className="invalid-feedback">
                            {errors.ProductName}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group">
                        <label>Product Category</label>
                        <Field
                          name="Category"
                          as="select"
                          className={`form-control ${errors.Category && touched.Category ? "is-invalid"  : ""}`}
                          required
                        >
                          <option value="">Select a category</option>
                          <option value="Mobile">Mobile</option>
                          <option value="Laptop">Laptop</option>
                          <option value="Men's Wear">Men's Wear</option>
                          <option value="Women's Wear">Women's Wear</option>
                          <option value="Kids & Toys">Kids & Toys</option>
                          <option value="Furniture">Furniture</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Sports">Sports</option>
                        </Field>
                        {errors.Category && touched.Category && (
                          <div className="invalid-feedback">
                            {errors.Category}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    
                    <Col>
                      <div className="form-group">
                        <label>Product Description</label>
                        <Field
                          name="Description"
                          className={`form-control ${
                            errors.Description && touched.Description
                              ? "is-invalid"
                              : ""
                          }`}
                          component="textarea"
                          placeholder="Enter the Product Description"
                          required
                        />
                        {errors.Description && touched.Description && (
                          <div className="invalid-feedback">
                            {errors.Description}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group">
                        <label>Product Quantity</label>
                        <Field
                          name="Quantity"
                          className={`form-control ${
                            errors.Quantity && touched.Quantity
                              ? "is-invalid"
                              : ""
                          }`}
                          type="number"
                          placeholder="Enter the Product Quantity"
                          required
                        />
                        {errors.Quantity && touched.Quantity && (
                          <div className="invalid-feedback">
                            {errors.Quantity}
                          </div>
                        )}
                      </div>
                    </Col>
                    <Col>
                      <div className="form-group">
                        <label>Product Price</label>
                        <Field
                          name="Price"
                          className={`form-control ${
                            errors.Price && touched.Price ? "is-invalid" : ""
                          }`}
                          type="number"
                          placeholder="Enter the Product Price"
                          required
                        />
                        {errors.Price && touched.Price && (
                          <div className="invalid-feedback">{errors.price}</div>
                        )}
                      </div>
                    </Col>
                    
                  </Row>
                  <div className="text-center">
                    <Button variant="primary" type='submit' className='m-2'>Update</Button>
                    <Button variant='danger' className='m-2'>Cancel</Button>
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
}
