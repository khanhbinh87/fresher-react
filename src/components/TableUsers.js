import React, { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';

import ModalAddNew from './ModalAddNew';

import { fetchAllUser } from '../services/UserService'

import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';

export default function TableUsers(props) {

  const [listUsers, setListUsers] = useState([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  useEffect(() => {
    getUsers(1)
  }, [])
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {

      setTotalPages(res.total_pages);
      setListUsers(res.data)
    }
    return res;
  }
  const handlePageClick = (event) => {

    getUsers(+event.selected + 1)
  }
  const handleUpdateUsers = (user) =>{
    setListUsers([user,...listUsers])
  }

  return (

    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <strong>List Users :</strong>
        <button
          className="btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {
            listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
              return (<tr key={`users-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
              </tr>)
            })
          }


        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew show={isShowModalAddNew} handleClose={() => setIsShowModalAddNew(false)} handleUpdateUsers={handleUpdateUsers}/>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </>
  )
}
