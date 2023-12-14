/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { Cards } from '../Card/Card';
import { Header } from '../Navbar/navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from "../../Utils/Api";
import { useDispatch } from 'react-redux';
import { allProduct, searchPrdouct } from '../../Admin/Redux/Reducer/productSlice';
import { Footer } from '../Footer';

export const Main = () => {
  const [filterKeyword, setFilterKeyword] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [AllProducts, setAllProducts] = useState([]);
  
  
  
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
  }, []);

  


  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API}/api/products/all-products/`
      );
      if (response.data.status) {
        const products = response.data.data;
        setAllProducts(products);
        dispatch(allProduct(products));
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



  const searchProducts = async () => {

    try {
      if (filterKeyword.trim() === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "Enter the Product Name",
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
        
      }
      else{
        const response = await axios.get(`${API}/api/products/search-products`, {
          headers: {
            authorization: window.localStorage.getItem('token'),
          },
          
          params: {
            ProductName: filterKeyword,
          },
        
        });
        if (response.data.status) {
          console.log(response.data.data);
          setAllProducts(response.data.data);
          dispatch(searchPrdouct(response.data.data));
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          });
        } else {
          setAllProducts([]);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }

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

  

  const handleSort = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);

    const sortedProducts = [...AllProducts];

    if (selectedSortOption === 'lowToHigh') {
      sortedProducts.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
    } else if (selectedSortOption === 'highToLow') {
      sortedProducts.sort((a, b) => b.ProductName.localeCompare(a.ProductName));
    }

    setAllProducts(sortedProducts);
  };

  return (
    <>
      <Header/>
      <Container fluid >
        <Row>
          <Col className='ms-auto m-3'>
            <Form>
              <Row>
                <Col sm={12} md={10} lg={10}>
                  <Form.Control
                    type='search'
                    placeholder='Search for a Product'
                    aria-label='Search'
                    value={filterKeyword}
                    onChange={(e) => setFilterKeyword(e.target.value)}
                    
                  />
                </Col>
                <Col>
                  <Button variant='outline-danger' onClick={searchProducts}>Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        {AllProducts.length > 0 ? (
          <>
            <Row>
              <Col xs={12} md={4} lg={3} className='ms-auto mb-3'>
                <Form>
                  <Form.Select value={sortOption} onChange={handleSort}>
                    <option value='default'>Select one</option>
                    <option value='lowToHigh'>Low to High</option>
                    <option value='highToLow'>High to Low</option>
                  </Form.Select>
                </Form>
              </Col>
            </Row>
            <Row className=' '>
              {AllProducts.map((card, index) => (
                <Col key={index}>
                  <Cards values={card} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <h5>No data found</h5>
        )}
        
        
        <Footer/>
      </Container>
      
    </>
  );
};



