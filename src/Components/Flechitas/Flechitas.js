import React, { useState, useEffect } from 'react';
import './Flechitas.css';
import SubirIcon from "../../images/subir.png";
import BajarIcon from "../../images/bajar.png";

function Flechitas({ costeTotal, cambiarCosteTotal, productos, modificarProductos, precio, idProducto, cantidadProvisional, nombreProducto }) {
  const [value, setValue] = useState(cantidadProvisional || 0);
  const minValue = 0;
  const maxValue = 100;

  const updateCantidadProvisional = (newCantidad) => {
    modificarProductos(productos.map(producto => 
      producto.id === idProducto ? { ...producto, cantidadCarro: newCantidad } : producto
    ));
  };

  const handleDecrease = () => {
    const newValue = Math.max(value - 1, minValue);
    setValue(newValue);
    cambiarCosteTotal(costeTotal - precio);
    updateCantidadProvisional(newValue);
  };

  const handleIncrease = () => {
    const newValue = Math.min(value + 1, maxValue);
    setValue(newValue);
    cambiarCosteTotal(costeTotal + precio);
    updateCantidadProvisional(newValue);
  };

  useEffect(() => {
    setValue(cantidadProvisional);
  }, [cantidadProvisional]);

  return (
    <div className="container-flechita">
      <button
        className="arrow-button"
        onClick={handleDecrease}
        disabled={value <= minValue}
        aria-label={`Disminuir la cantidad de ${nombreProducto} a ${value - 1}`}
      >
        <img className="arrow" src={BajarIcon} alt={`Disminuir la cantidad de ${nombreProducto}`} />
      </button>

      <input
        type="number" className='numeroTienda'
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        min={minValue}
        max={maxValue}
        size={1}
        tabIndex={-1}
        readOnly
        aria-label={`Cantidad de ${nombreProducto}`}
      />
      
      <button
        className="arrow-button"
        onClick={handleIncrease}
        disabled={value >= maxValue}
        aria-label={`Aumentar la cantidad de ${nombreProducto} a ${value + 1}. Precio por unidad: ${precio} monedas.`}
      >
        <img className="arrow" src={SubirIcon} alt={`Aumentar la cantidad de ${nombreProducto}. Precio por unidad: ${precio} monedas.`} />
      </button>
    </div>
  );
}

export default Flechitas;
