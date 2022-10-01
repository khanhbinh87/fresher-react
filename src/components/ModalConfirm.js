// import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";


// import { putEditUser } from "../services/UserService";
// import { toast } from 'react-toastify';

import Modal from "react-bootstrap/Modal";

export default function ModalConfirm(props) {
    const { show, handleClose, dataUserDelete } = props;
  
    const handleDeleteUser = () => {
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            Ban chac chan muon xoa email:  <h3> {dataUserDelete.email}</h3>
                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
