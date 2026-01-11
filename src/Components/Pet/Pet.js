import React, { forwardRef } from 'react';
import './Pet.css'; // Crea este archivo para tus estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import bathtub from "../../images/bathtub.png";
import heart from "../../images/heart.png";

const Pet = forwardRef(function Pet({ image, cleaningMode, cleanliness, setCleanliness, showHeart, increaseAffection}, ref) {

  const handleMouseEnter = () => {
    if (cleaningMode && cleanliness < 100) {
        let value = 3;
        while (cleanliness + value > 100) {
          value = value - 1;
        }
        setCleanliness(cleanliness + value);
    }
  };

  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && ref && ref.current) {
      increaseAffection();
      ref.current.focus();
    }
  };
  
  return (
    <div className="pet-container d-flex flex-column align-items-center justify-content-center h-100">
      {/* Mostrar el corazón si se muestra */}
      {showHeart && !cleaningMode && (
        <div className="text-center">
          {/* <h1 className='heart-info'>¡Haz click en el corazón!</h1> */}
          <img
            tabIndex={2}
            ref={ref}
            onKeyDown={handleKeyDown}
            onClick={increaseAffection}
            className="heart-icon img-fluid"
            src={heart}
            alt="Pulsa enter en el corazón para darle cariño a tu mascota."
          />
        </div>
      )}

      <div className='cleaning-area' onMouseEnter={handleMouseEnter} onClick={handleMouseEnter} />

      {/* Contenedor para la imagen de Pou y la bañera */}
      <div className="pet-image-container">
        <img
          src={image}
          alt="Tu mascota"
          className="pet-image img-fluid"
          onDragStart={(e) => e.preventDefault()}
        />
        {/* Bañera superpuesta sobre Pou */}
        {cleaningMode && cleanliness < 100 && (
          <img
            className="bathtub-icon"
            src={bathtub}
            alt="Frota bien a tu mascota. Mueve el cursor para ello."
          />
        )}
      </div>

      {/* Mostrar la información de limpieza si está en modo de limpieza */}
      {cleaningMode && cleanliness < 100 && (
        <div className="text-center mt-3">
          {/* <h1 className='bath-info'>¡Frota bien a tu mascota!</h1> */}
        </div>
      )}
    </div>
  );
});

export default Pet;
