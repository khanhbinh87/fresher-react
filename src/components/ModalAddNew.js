import React, { useState } from "react";

import Button from "react-bootstrap/Button";


import { postAddUser } from "../services/UserService";
import { toast } from 'react-toastify';

import Modal from "react-bootstrap/Modal";

export default function ModalAddNew(props) {
  const { show, handleClose, handleUpdateUsers } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {

    let res = await postAddUser(name, job);
    if (res && res.id) {
      handleClose()
      setName('');
      setJob('');
      toast.success('User added successfully')
      handleUpdateUsers({first_name:name,id:res.id});
    } else {
      toast.error('Error adding user')
    }

  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Job
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
