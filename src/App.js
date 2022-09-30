
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import ModalAddNew from './components/ModalAddNew';
import { useState } from 'react';

function App() {
  const [isShowModalAddNew,setIsShowModalAddNew] = useState(false)
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-3 d-flex justify-content-between align-items-center">
          <strong>List Users :</strong>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            Add new user
          </button>
        </div>
        <TableUsers />
      </Container>
      <ModalAddNew show={isShowModalAddNew} handleClose ={()=> setIsShowModalAddNew(false)}/>
    </div>
  );
}

export default App;
