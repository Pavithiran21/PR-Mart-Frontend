/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row, Container, Button, Card, Table} from "react-bootstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../Utils/Api";
import { useDispatch } from "react-redux";

import Swal from 'sweetalert2';
import { viewProduct } from "../Redux/Reducer/productSlice";

export const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [productData, setProductData] = useState([]);

  useEffect(()=>{
    fetchPrdouctData(id);
  },[])

  


  const fetchPrdouctData = async () => {

    try{

      const response = await axios.get(`${API}/api/products/view-product/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
      }});
      console.log(response);
      if(response.data.status){
        setProductData(response.data);
        dispatch(viewProduct(id));
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Product cannot be viewed.!!!",
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });

      }
    }
    catch(err){
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please check it.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'OK',
      });

    }
  
  }
  

  const AddCartProduct = async () => {
    try {

      const userId = window.localStorage.getItem('userId');
      const response = await axios.post(`${API}/api/cart/add-to-cart`,{product: productData.data._id,userId: userId},{
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      console.log(response.data.data);

      if (response.data.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate("/");
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
    {productData && productData.data &&(
      <Container fluid>
        <Row>
          <h1 className="text-center">View Product</h1>
        </Row>
        <Row className="m-3">
          <Col>
            <Card border="danger">
              <Card.Img variant="top" src={productData.data.ProductImageUrl} alt="product"/>
              <Card.Body>
                
              
                <Table striped bordered responsive variant="primary" hover>
                  <tbody>
                    <tr>
                      <td className="">
                        <h5>Product Name</h5>
                      </td>
                      <td className="">
                        <b className="">{productData.data.ProductName}</b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Product Description</h5>
                      </td>
                      <td>
                        <p>{productData.data.Description}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h5>Product Quantity</h5>
                      </td>
                      <td>
                        <p>{productData.data.Quantity}</p>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>
                        <h5>Product Category</h5>
                      </td>
                      <td>
                        <p>{productData.data.Category}</p>
                      </td>
                    </tr>
                    <tr>

                      <td>
                        <h5>Product Price</h5>
                      </td>
                      <td>
                        <p>₹ {productData.data.Price}</p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <Row>
                  <Col>
                    <div className="text-center">
                      <Link to={'/place-order'}>
                       <Button variant="warning">Buy Now</Button>
                      </Link>
                      
                    </div>
                  </Col>
                  <Col>
                    <div className="text-center">
                      
                      <Button variant="danger" onClick={AddCartProduct}>Add to Cart</Button>
                    
                      
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
      

        </Row>

        <Row className="text-center m-4">
          <Link to="/">
           <Button variant="outline-primary">Back</Button>
          </Link>
          
        </Row>
       
      </Container>

     )}
    </>
   
  );
  
  
};
