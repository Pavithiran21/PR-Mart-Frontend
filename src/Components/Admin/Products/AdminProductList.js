/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { Link, useNavigate} from 'react-router-dom';
import { AdminNavbar } from '../Navbar/navbar';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { allProduct, deleteProduct } from '../Redux/Reducer/productSlice';
import { API } from '../../Utils/Api';

export const AdminProductList = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [search, setSearch] = useState('');
  // const [filteredProducts, setFilteredProducts] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API}/api/products/all-products/`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        setAllProducts(response.data.data);
        dispatch(allProduct(response.data.data))
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
        }).then(() => {
          navigate('/admin-dashboard');
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


  


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(AllProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = AllProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Assuming you have an action creator for searchProducts in your Redux slice






  





  const DeleteProduct = (id) =>{
      axios.delete(`${API}/api/products/delete-product/${id}`,{
        headers: {
          authorization:window.localStorage.getItem('token'),
        },
      })
      .then((response)=>{
        console.log(response)
        console.log(id);
        if(response.data.status){
          console.log(response.data);
          dispatch(deleteProduct(id));
          // dispatch(deleteProducts(id));
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(()=>{
            getAllProducts();
          })
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Delete cannot be found.",
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
          });
        }
      })
      .catch((error)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong. Please check it.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK',
        });
      })

  
  }








  return (
    <>
      <AdminNavbar />
      <Container fluid className="seller text-center">
        <Row>
          <Col>
            <Col sm={12}>
              <h1>All Products</h1>
           </Col>
           <Row className='m-3'>
       
        </Row>
        <Row className="m-3">
          <Col>
            <Link to="/admin/create-product">
              <Button style={{ float: 'right' }}>Add Product</Button>
            </Link>
          </Col>
        </Row>


          </Col>
         
        </Row>
       
        {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
          <Row>
            <Col>
              <Table responsive striped bordered hover variant="dark" className="table-adjust">
                <thead>
                  <tr className="">
                    <th>S.No</th>
                    <th>Product ID</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Product Category</th>
                    <th>Price Per Product (Rs.)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1 + indexOfFirstProduct}</td>
                      <td>{product._id}</td>
                      <td>
                        <img
                          src={product.ProductImageUrl}
                          alt="logo"
                          width="120px"
                          height="100px"
                        />

                      </td>
                      <td>{product.ProductName}</td>
                      <td>{product.Quantity}</td>
                      <td>{product.Category}</td>
                      <td>{product.Price}</td>
                      <td className=''>
                        <div className='d-flex  justify-content-center'>
                          <Link to={`/admin/edit-product/${product._id}`} className='m-2'>
                            <Button variant="success">Edit</Button>
                          </Link>
                          <Link to={`/admin/view-product/${product._id}`} className='m-2'>
                            <Button variant="warning">View</Button>
                          </Link>
                          <Button variant="danger" className='m-2' onClick={() => DeleteProduct(product._id)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className='m-auto p-auto'>
            <Col className='text-center'>
               <h1>No Product Data Found</h1>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );

};
