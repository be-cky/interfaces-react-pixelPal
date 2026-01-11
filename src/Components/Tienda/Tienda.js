import React, { useState } from 'react';
import Modal from 'react-modal';
import { usePet } from "../PetContext";
import './Tienda.css';
import coin from '../../images/coin.png';
import Flechitas from '../Flechitas/Flechitas';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmacionTienda from '../ConfirmacionTienda/ConfirmacionTienda';
import VolverIcon from "../../images/cerrar.png";

const Tienda = ({ isOpen, onClose, arrayProductos, modificarArray }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const handleOpenConfirm = () => {
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleAcceptConfirm = () => {
    setIsConfirmOpen(false);
    toast.success('¡Compra realizada con éxito!');
    handleCloseTienda();
  };

  const handleCloseTienda = () => {
    onClose();
    setTotalCost(0);
  }

  const { money } = usePet();

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const productRows = chunkArray(arrayProductos, 3);

  return (
    <Modal
      className="modal-container-tienda"
      overlayClassName="modal-overlay-tienda"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      
        <div className="row-1">
          <div className="col">
            <h1 className="titulo-tienda">Tienda</h1>
            <button type="button" className='volver' onClick={handleCloseTienda}>
              <img className="foto" src={VolverIcon} alt="cerrar" />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
          <div className='scrollable'>
  <table className="tabletienda">
    <tbody className='tbodytienda'>
      {productRows.map((row, rowIndex) => (
        <tr key={rowIndex} className='pantallaTienda'>
          {row.map(producto => (
            <td key={producto.id}>
              <div className='content-articulo'>
                <img className='img-tienda' src={producto.imagen} alt={producto.nombre} />
                <p className='parrafo'>Precio unidad: {producto.precio} <img className="icon-p" src={coin} alt="coin" /></p>
                <Flechitas
                  className='flechita'
                  costeTotal={totalCost}
                  cambiarCosteTotal={setTotalCost}
                  productos={arrayProductos}
                  modificarProductos={modificarArray}
                  precio={producto.precio}
                  idProducto={producto.id}
                  cantidadProvisional={producto.cantidadCarro}
                  nombreProducto={producto.nombre}
                />
              </div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className='dinero-tienda' tabIndex="0" role="region" aria-labelledby="total-label" aria-describedby="total-description">
                <h2 id="total-label">Total: {money}</h2>
                <img id="total-description" className="icon" src={coin} alt="Moneda indicando el total" />
              </div>
            </div>
            <div className="row">
              <div className='costeTotal-tienda' tabIndex="0" role="region" aria-labelledby="coste-total-label" aria-describedby="coste-total-description">
                <h2 id="coste-total-label">Coste total: {totalCost}</h2>
                <img id="coste-total-description" className="icon" src={coin} alt="Moneda indicando el coste total" />
              </div>
            </div>
            <div className="row">
              <td colSpan="3" className='button-celda'>
                <button onClick={handleOpenConfirm} className='button-tienda'>Comprar</button>
              </td>
            </div>
          </div>
        </div>
      

      <ConfirmacionTienda
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onAccept={handleAcceptConfirm}
        costeCompra={totalCost}
        productos={arrayProductos}
        modificarProductos={modificarArray}
      />
    </Modal>
  );
};

export default Tienda;
