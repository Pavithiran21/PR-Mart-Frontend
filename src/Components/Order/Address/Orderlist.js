/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {faPen}from '@fortawesome/free-solid-svg-icons';
import Pagination from 'react-bootstrap/Pagination';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { AdminNavbar } from '../../Admin/Navbar/navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../../Utils/Api';
import { useNavigate} from 'react-router-dom';


export const Orderlist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const ordersPerPage = 5;


  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const response = await axios.get(`${API}/api/orders/all-order/`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        setAllOrders(response.data.data);
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

  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  const indexOfLastProduct = currentPage * ordersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ordersPerPage;
  const currentOrders = allOrders.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const viewOrder = (id) => {
    navigate(`/view-order/${id}`)
    // Implement view order functionality (e.g., redirect to order details page)
    
  };

  const updateOrder = (id) => {
    navigate(`/update-order-status/${id}`)
    // Implement view order functionality (e.g., redirect to order details page)

  };


  const deleteOrder = (id) => {
    axios
      .delete(`${API}/api/orders/delete-order/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.data.status) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: response.data.message,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          }).then(() => {
            getAllOrders();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Delete cannot be found.",
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
      <AdminNavbar />
      <Container fluid className="seller text-center">
        <Row>
          <Col>
            <h1>All Orders</h1>
          </Col>
        </Row>
        {Array.isArray(currentOrders) && currentOrders.length > 0 ? (
          <Row className="m-auto p-auto">
            <Col>
              <Table responsive bordered hover className="table-adjust">
                <thead>
                  <tr className="studentvalues">
                    <th>S.No</th>
                    <th>Username</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Product ID</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Order Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1 + indexOfFirstProduct}</td>
                      
                      <td>{order.username}</td>
                      <td>{order.phone}</td>
                      <td>{order.city}</td>
                      <td>
                      {order.cartsItems.map((cartItem, cartIndex) => (
                        <div key={cartIndex}>
                          <p>
                            {cartItem.product._id}
                          </p>
                        </div>
                      ))}
                    </td>
                    <td>
                      {order.cartsItems.map((cartItem, cartIndex) => (
                        <div key={cartIndex}>
                          <p>{cartItem.quantity}</p>
                        </div>
                      ))}
                    </td>
                    <td>
                      <p>
                        
                        {order.cartsItems.reduce(
                          (total, cartItem) => total + cartItem.product.Price * cartItem.quantity,
                          0
                        )}
                      </p>
                    </td>
                    <td>
                     
                       {order.orderStatus}
                      
                    </td>
                     
                      <td>
                        <div className="m-auto p-auto d-flex justify-content-around" style={{ cursor: 'pointer' }}>
                          <FontAwesomeIcon icon={faPen}
                          className="text-success"
                          onClick={() => updateOrder(order._id)}
                          />
                          <FontAwesomeIcon
                            icon={faEye}
                            className="text-primary"
                            onClick={() => viewOrder(order._id)}
                          />
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-danger"
                            onClick={() => deleteOrder(order._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
                <Pagination>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="m-auto p-auto">
            <Col className="text-center">
              <h1>No Order Data Found</h1>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};







