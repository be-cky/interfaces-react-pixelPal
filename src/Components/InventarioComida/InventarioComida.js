import React from 'react';
import Modal from 'react-modal';

import './InventarioComida.css';
import VolverIcon from "../../images/cerrar.png";

const InventarioComida = ({ isOpen, onClose, children, seleccionarComida, arrayProductos }) => {
  return (
    <Modal
      className="modal-container"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      aria={{
        labelledby: "titulo-tienda",
        describedby: "descripcion-tienda"
      }}
    >
      <div className="modal-content" role="dialog" aria-modal="true">
        {children}
        <div className="row-1">
          <div className="col">
            <h1 id="titulo-tienda" className="titulo-tienda">¡Haz click en la comida!</h1>
            <button className='cerrar' onClick={onClose} aria-label="Cerrar">
              <img className="foto" src={VolverIcon} alt="cerrar" />
            </button>
          </div>
        </div>
        
        <ul className='lista'>
          {arrayProductos.map(producto => (
            producto.cantidad > 0 && (
              <li key={producto.id}>
                <div className='objeto'>
                  <img 
                    onClick={seleccionarComida}
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="lista-comida"
                    data-puntos={producto.puntos}
                    data-id={producto.id}
                    tabIndex="0"
                    aria-describedby={`cantidad-${producto.id}`}
                  />
                </div>
                <p id={`cantidad-${producto.id}`}>{producto.cantidad}</p>
              </li>
            )
          ))}
        </ul>
        
      </div>
    </Modal>
  );
};

export default InventarioComida;
