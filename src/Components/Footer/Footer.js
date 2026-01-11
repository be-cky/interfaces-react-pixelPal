import React, { useState, useEffect, useRef, forwardRef } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = forwardRef(function Footer({
  onActivateHeart,
  onCleaningMode,
  onHandleCleaningDone,
  openDecoF,
  openInventary,
  openTiendita,
  arrayProductos,
  modificarArray
}, ref) {
  const [showTooltip, setShowTooltip] = useState(false);
  const scrollableRef = useRef(null);

  useEffect(() => {
    if (scrollableRef.current) {
      const scrollWidth = scrollableRef.current.scrollWidth;
      const clientWidth = scrollableRef.current.clientWidth;
      scrollableRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  function afectoHandler() {
    onActivateHeart(true);
    onHandleCleaningDone();
    if (ref && ref.current) {
      ref.current.focus();
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      afectoHandler();
    }
  }

  function cleaningHandler() {
    onActivateHeart(false);
    onCleaningMode();
  }

  function tiendaHandler(){
    modificarArray(arrayProductos.map(producto => ( { ...producto, cantidadCarro: 0})));
    openTiendita(true);
    onActivateHeart(false);
    onHandleCleaningDone();
  }

  function comidaHandler () {
    openInventary(true);
    onActivateHeart(false);
    onHandleCleaningDone();
 }

 function decoracionHandler () {
  openDecoF(true);
  onActivateHeart(false);
  onHandleCleaningDone();
}

function juegosHandler () {
  onActivateHeart(false);
  onHandleCleaningDone();
}

  return (
    <div className="footer">
      <Container>
        <Row className="justify-content-center">
          <Col xs={6} sm={4} md={2} className="mb-2">
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="tooltip-afecto">
                  Haz click en el corazón para dar amor a tu mascota
                </Tooltip>
              }
            >
              <button className="botonDegradadoNombreA" onClick={afectoHandler} aria-describedby="tooltip-afecto">Afecto</button>
            </OverlayTrigger>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2">
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="tooltip-comida">
                  Selecciona la comida de tu inventario.
                </Tooltip>
              }
            >
              <button className="botonDegradadoNombreA" onClick={comidaHandler} aria-describedby="tooltip-comida">Comida</button>
            </OverlayTrigger>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2">
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="tooltip-limpieza">
                  Limpia y refresca a tu mascota con un buen baño.
                </Tooltip>
              }
            >
              <button className="botonDegradadoNombreA" onClick={cleaningHandler} aria-describedby="tooltip-limpieza">Limpieza</button>
            </OverlayTrigger>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2">
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="tooltip-juegos">
                  Juega con tu mascota y gana monedas.
                </Tooltip>
              }
            >
              <Link to="/game" tabIndex={-1}>
                <button className="botonDegradadoNombreA" aria-describedby="tooltip-juegos" onClick={juegosHandler}>Minijuego</button>
              </Link>
            </OverlayTrigger>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2">
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={
                <Tooltip id="tooltip-tienda">
                  Compra comida para tu mascota.
                </Tooltip>
              }
              show={showTooltip}
            >
              <button className="botonDegradadoNombreA"
                onClick={tiendaHandler}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                aria-describedby="tooltip-tienda"
              >
                Tienda
              </button>
            </OverlayTrigger>
          </Col>
          <Col xs={6} sm={4} md={2} className="mb-2">
            <button className="botonDegradadoNombreA" onClick={decoracionHandler}>Decoración</button>
          </Col>
        </Row>
      </Container>
    </div>
  );
});

export default Footer;
