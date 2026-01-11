import React from "react";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import "./Ayuda.css"; // Asegúrate de tener el archivo de estilos para Ayuda
import VolverIcon from "../../images/cerrar.png";
import foodLogo from '../../images/food-icon-status-bar.png'
import heartLogo from '../../images/heart-status-logo.png'
import cleanLogo from '../../images/cleaning-status-logo.png'

function Ayuda({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header >
        <Row className="justify-content-center">
          <Col>
              <h1>¿Necesitas ayuda?</h1>
              <button aria-label="Cerrar ventana de ayuda" className="volver" onClick={onHide} tabIndex={0}>
                <img className="foto" src={VolverIcon} alt="Cerrar" />
              </button>
          </Col>
          </Row>
      </Modal.Header>
      <Modal.Body className="modalbodyrosa">
        <Container>
          <Row>
            <Col md={12}>
              <table className="tablaayuda">
                <thead>
                  <tr>
                    <th className="columnaizquierda"><h4 className="texto" tabIndex={0}>Botones</h4></th>
                    <th className="columnaderecha"><h4 className="texto" tabIndex={0}>Funcionalidad</h4></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="texto" tabIndex={0}>Afecto</td>
                    <td tabIndex={0}>
                      <p>Pulsa este boton para dar cariño a tu pal, clica en el corazon para aumentar su nivel de felicidad</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" tabIndex={0}>Comida</td>
                    <td tabIndex={0}>
                      <p>Pulsa este boton para desplegar el inventario de comida de tu pal, clica un plato para alimentarlo</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" tabIndex={0}>Limpieza</td>
                    <td tabIndex={0}>
                      <p>Pulsa este boton para ir a la ducha, Arrastra la esponja para limpiar a tu Pal</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" tabIndex={0}>Juegos</td>
                    <td tabIndex={0}>
                      <p>Pulsa este boton para jugar con tu Pal</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" tabIndex={0}>Tienda</td>
                    <td tabIndex={0}>
                      <p>Pulsa este boton para desplegar la tienda de objetos, añade los productos que quieras comprar y paga</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" tabIndex={0}>Decoracion</td>
                    <td tabIndex={0}>
                      <p>Pulsa este boton para cambiar la decoracion de tu casa</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" ><img tabIndex={0} className="barra" src={heartLogo} alt="barra de vida"/></td>
                    <td tabIndex={0}>
                      <p>Muestra el nivel de felicidad de tu Pal</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" ><img tabIndex={0} className="barra" src={foodLogo} alt="barra de comida"/></td>
                    <td tabIndex={0}>
                      <p>Muestra el nivel de hambre de tu Pal</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="texto" ><img tabIndex={0} className="barra" src={cleanLogo} alt="barra de limpieza"/></td>
                    <td tabIndex={0}>
                      <p>Muestra el nivel de suciedad de tu Pal</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      
    </Modal>
  );
}

export default Ayuda;