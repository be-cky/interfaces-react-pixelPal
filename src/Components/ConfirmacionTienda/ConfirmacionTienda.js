import React from 'react';
import Modal from 'react-modal';
import { usePet } from "../PetContext";
import './ConfirmacionTienda.css';
import coin from '../../images/coin.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmacionTienda = ({ isOpen, onClose, onAccept, costeCompra, productos, modificarProductos }) => {
  const { money, setMoney } = usePet();

  const handleAceptarCompra = () => {
    if ((money - costeCompra >= 0)) {
      modificarProductos(productos.map(producto => ({ ...producto, cantidad: producto.cantidadCarro + producto.cantidad })));
      setMoney(money - costeCompra);
      toast.success('¡Compra realizada con éxito!');
      setTimeout(() => {
        onAccept();
      }, 2000);
    } else {
      toast.error('¡No tienes dinero suficiente! Reduce el precio de tu compra o vuelve con más monedas.');
      setTimeout(() => {
        onClose();
      }, 3000);
    }
  }

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const filteredProductos = productos.filter(producto => producto.cantidadCarro > 0);
  const productosChunks = chunkArray(filteredProductos, 3);

  return (
    <>
      <ToastContainer />
      <Modal
        className="modal-container-tienda"
        overlayClassName="modal-overlay-tienda"
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Confirmación de compra"
        ariaHideApp={false}
      >
        <div className="row-1">
          <div className="col">
            <h1 className="titulo-tienda" tabIndex="0">Revisa tu compra</h1>
          </div>
        </div>

        <div className="modal-content" role="dialog" aria-modal="true">
          <div className="row">
            <div className="col-md-8">
              <div className='scrollable' role="table">
                <table>
                  <tbody>
                    {productosChunks.map((chunk, chunkIndex) => (
                      <tr key={chunkIndex} role="row">
                        {chunk.map((producto, productoIndex) => (
                          <td key={productoIndex} role="cell">
                            <div className='content-articulo'>
                              <img className='img-tienda' src={producto.imagen} alt={producto.nombre} tabIndex="0"/>
                              <p tabIndex="0">Cantidad: {producto.cantidadCarro}</p>
                              <p tabIndex="0">Precio unidad: {producto.precio} <img className="icon-p" src={coin} alt="coin icon" /></p>
                            </div>
                          </td>
                        ))}
                        {chunk.length < 3 && [...Array(3 - chunk.length)].map((_, index) => (
                          <td key={`empty-${index}`} role="cell" />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-4">
              <div className="row">
                <div className='dinero-tienda'>
                  <h3 tabIndex="0" aria-label={`Total: ${money} monedas`}>Total: {money} <img className="icon" src={coin} alt="coin icon" /></h3>
                </div>
              </div>

              <div className="row">
                <div className='costeTotal-tienda'>
                  <h3 tabIndex="0" aria-label={`Coste total: ${costeCompra} monedas`}>Coste total: {costeCompra} <img className="icon" src={coin} alt="coin icon" /></h3>
                </div>
              </div>

              <div className="row">
                <div className='dinero-tienda'>
                  <h3 tabIndex="0" aria-label={`Tu dinero: ${money} monedas`}>Tu dinero: {money} <img className="icon" src={coin} alt="coin icon" /></h3>
                </div>
              </div>

              <div className="row">
                <div className='dinero-tienda'>
                  <h3 tabIndex="0" aria-label={`Dinero Restante: ${money - costeCompra} monedas`}>Dinero Restante: {money - costeCompra} <img className="icon" src={coin} alt="coin icon" /></h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row-1">
            <div className="col">
              <h3 className="titulo-tienda" tabIndex="0">¿Quieres realizar la compra?</h3>
            </div>
          </div>

          <div className='row'>
            <button className='button-aceptar' onClick={handleAceptarCompra} aria-label="Aceptar compra">Aceptar</button>
            <button className='button-cancelar' onClick={onClose} aria-label="Cancelar compra">Cancelar</button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmacionTienda;
