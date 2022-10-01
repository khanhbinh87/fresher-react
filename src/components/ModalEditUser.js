import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";


// import { postAddUser } from "../services/UserService";
import { toast } from 'react-toastify';

import Modal from "react-bootstrap/Modal";

export default function ModalEditUser(props) {
    const { show, handleClose, dataUsers } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUser = () => {
        console.log(dataUsers);
        toast.success('Edit successfully')
        handleClose();
    }
    useEffect(() => {
        if (show) {
            setName(dataUsers.first_name)
        }
    }, [dataUsers,show])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditUser()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}