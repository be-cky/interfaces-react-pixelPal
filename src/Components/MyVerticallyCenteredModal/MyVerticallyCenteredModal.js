import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { usePet } from "../PetContext";


function MyVerticallyCenteredModal(props) {

    const {petName, petImage} = usePet();

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'rgb(163, 45, 18)', fontWeight: 'bold'}}>
            <h1>¿ESTÁS SEGURO?</h1>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
            <h2>Tu mascota tendrá las siguientes características:</h2>
            <h2  style={{fontWeight: 'bold'}}> Nombre : <span style={{ color: 'blue' }}>{petName} </span></h2>
            <h2  style={{fontWeight: 'bold'}}> Tipo:<img src={petImage} width="220" height="200"></img></h2> 
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>Volver</Button>
            <Link to="/principal">
                <Button style={{background: 'linear-gradient(to bottom, #f083b9, #f5c9e0)'}} size="lg" variant="success">Confirmar selección</Button>
            </Link>
        </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;
