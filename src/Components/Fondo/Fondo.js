import React from 'react';
import './Fondo.css'; // Crea este archivo para tus estilos

function Fondo({ image }) {
  return (
    <div className="fondo-container">
      <img src={image} alt="Fondo" className="fondo-image" />
    </div>
  );
}

export default Fondo;