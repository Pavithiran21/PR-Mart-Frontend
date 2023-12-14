/* eslint-disable no-unused-vars */
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from "../../Utils/Api";
import { Link, useNavigate } from 'react-router-dom';

export const Cards = (Data) => {
  const navigate = useNavigate();

  

  const AddCartProduct = async () => {
    try {

      const userId = window.localStorage.getItem('userId');
      const response = await axios.post(`${API}/api/cart/add-to-cart`,{product: Data.values._id,userId: userId},{
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
    <Card className='custom-card'>
      <Link to={`/view-product/${Data.values._id}`}>
        <Card.Img
          variant="top"
          src={Data.values.ProductImageUrl}
          alt="Product Image"
          className="card-img"
        />
      </Link>

      <Card.Body>
        <Card.Title>{Data.values.ProductName}</Card.Title>
        <hr className="divider" />
        <Card.Text className='align-center' >
          <b>Category:</b> 
          <span>{Data.values.Category}</span>
        </Card.Text>
        <Card.Text>
          <b>Price:</b> 
          <span> ₹ {Data.values.Price}</span>
        </Card.Text>

        <Button variant="success" className="add-to-cart-btn" onClick={AddCartProduct}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};






