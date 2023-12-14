import React from "react";
import { Field, Form, Formik } from "formik";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as yup from "yup";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/esm/Button';
import { AdminNavbar } from "../Navbar/navbar";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch, } from 'react-redux'; // Import useDispatch from Redux

import { API } from "../../Utils/Api";
import { createProduct } from "../Redux/Reducer/productSlice";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = yup.object({
    ProductImageUrl: yup.string().required("Product Image is required"),
    ProductName: yup.string().required("Product Name is required"),
    Category: yup.string().required("Product Category is required"),
    Description: yup.string().max(300, "Must be 300 characters or less").min(50,"Must be 50 characters or more").required("Product Description is required"),
    Quantity: yup.number().required("Product Quantity is required"),
    Price: yup.number().required("Product Price is required"),
  });

  const SubmitHandler = async (data) => {
    try {
      // Make an API request to add the product on the backend
      const response = await axios.post(`${API}/api/products/create-product`, data,{
        headers: {
          authorization:window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        // Dispatch an action to update the Redux store
        // dispatch(addProduct(response.data));
        console.log(response);
        console.log(response.data);
        dispatch(createProduct(response.data))

        // Show a success message
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/admin-dashboard");
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

  return (
    <>
      <AdminNavbar/>
      <Container fluid className="seller">
        <Row className="justify-content-center">
          <h1 className='text-center'>Create Product</h1>
        </Row>
        <Row>
          <Col>
            <div className="bg-white form-wrapper">
              <Formik
                initialValues={{
                  ProductImageUrl: "",
                  ProductName: "",
                  Category: "",
                  Description: "",
                  Quantity: "",
                  Price: "",
                }}
                validationSchema={validate}
                onSubmit={(values) => {
                  // Call your SubmitHandler to handle form submission
                  SubmitHandler(values);
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
                              <div className="invalid-feedback">{errors.Price}</div>
                            )}
                          </div>
                        </Col>
                        
                      </Row>
                      <div className="text-center">
                        <Button variant="primary" type='submit' className='m-2'>Submit</Button>
                        <Button variant='danger' type='reset' className='m-2'>Reset</Button>
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
