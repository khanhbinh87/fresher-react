import React, { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table';

import ModalAddNew from './ModalAddNew';
import ModalEditUser from './ModalEditUser';

import { fetchAllUser } from '../services/UserService'

import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import _ from 'lodash';
import ModalConfirm from './ModalConfirm';
export default function TableUsers(props) {

  const [listUsers, setListUsers] = useState([])

  // const [totalUsers, setTotalUsers] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)

  const [isShowModalEdit, setIsShowModalEdit] = useState(false)
  const [dataUsers, setDataUsers] = useState("")

  const [isShowModalDelete, setIsShowModalDelete] = useState(false)
  const [dataUserDelete, setDataUsersDelete] = useState("")

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
  const handleUpdateUsers = (user) => {
    setListUsers([user, ...listUsers])
  }
  const handleEdit = (user) => {

    setIsShowModalEdit(true);
    setDataUsers(user)
  }
  const handlePutUsers = (user) => {

    let index = listUsers.findIndex(item => item.id === user.id)
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);

  }
  const handleDelete = (user) => {
    setDataUsersDelete(user)
    setIsShowModalDelete(true)
  }
  const handleDeleteUsers = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);

      cloneListUsers = cloneListUsers.filter(item =>  item.id !== user.id)
   
   
    setListUsers(cloneListUsers);
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
            <th>Action</th>

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
                <td>
                  <button
                    className="btn btn-success  me-3"
                    onClick={() => handleEdit(item)}
                  >Edit</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item)}
                  >Delete</button>
                </td>
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
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={() => setIsShowModalAddNew(false)}
        handleUpdateUsers={handleUpdateUsers}

      />

      <ModalEditUser
        show={isShowModalEdit}
        dataUsers={dataUsers}
        handleClose={() => setIsShowModalEdit(false)}
        handlePutUsers={handlePutUsers}
      />
      <ModalConfirm
        handleClose={() => setIsShowModalDelete(false)}
        show={isShowModalDelete}
        dataUserDelete={dataUserDelete}
        handleDeleteUsers={handleDeleteUsers}
      />


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
