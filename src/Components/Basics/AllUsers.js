/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { AdminNavbar } from '../Admin/Navbar/navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API } from '../Utils/Api';
import { useNavigate } from 'react-router-dom';

export const AllUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const[User,setUser] = useState([]);
  const usersPerPage = 5;


  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${API}/api/users/all-users/`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });

      if (response.data.status) {
        console.log(response.data)
        setUser(response.data.data);
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


  const totalPages = Math.ceil(User.length / usersPerPage);

  // Calculate the index of the first and last user to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = User.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  
  return (
    <>
      <AdminNavbar />
      <Container fluid className='seller text-center'>
        <Row>
          <Col>
            <h1>All Users</h1>
          </Col>
        </Row>
        {Array.isArray(currentUsers) && currentUsers.length > 0 ? (
           <Row className='m-auto p-auto'>
           <Col>
             <Table responsive bordered hover className='table-adjust'>
               <thead>
                 <tr className='studentvalues'>
                   <th>S.No</th>
                   <th>First Name</th>
                   <th>Last Name</th>
                   <th>Email</th>
                  
                 </tr>
               </thead>
               <tbody>
                 {currentUsers.map((user, index) => (
                   <tr key={user.id}>
                     <td>{index + 1 + indexOfFirstUser}</td>
                     <td>{user.firstname}</td>
                     <td>{user.lastname}</td>
                     <td>{user.email}</td>
                     
                   </tr>
                 ))}
               </tbody>
             </Table>
             <div className='d-flex justify-content-center'>
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
        ):(
          <Row className='m-auto p-auto'>
            <Col className='text-center'>
               <h1>No Users Data Found</h1>
            </Col>
          </Row>
        )}
       
      </Container>
    </>
  );
};

