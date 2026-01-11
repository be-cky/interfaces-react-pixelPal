import React, { useRef, useState } from "react";
import Modal from 'react-modal';
import fondobasico2 from '../../images/fondo-images/fondobasico2.jpg';
import beeRoom from '../../images/fondo-images/beeRoom.jpg';
import cocina from '../../images/fondo-images/cocina.jpg';
import salon from '../../images/fondo-images/salon.jpg';
import cueva from '../../images/fondo-images/cueva.jpg';
import VolverIcon from "../../images/cerrar.png";
import './MenuDecoracion.css';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

const MenuDecoracion = ({ isOpen, onClose, children, img_func, imgActual }) => {
    const [imageSelected, setImageSelected] = useState(imgActual);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const images = [
        { src: cocina, alt: "Fondo de cocina" },
        { src: salon, alt: "Fondo de salón" },
        { src: cueva, alt: "Fondo de cueva" },
        { src: beeRoom, alt: "Fondo de habitación" },
        { src: fondobasico2, alt: "Fondo de paisaje" }
    ];

    // Función para encontrar el 'alt' basado en el 'src'
    const findAltBySrc = (src) => {
        const image = images.find(image => image.src === src);
        return image ? image.alt : 'Imagen de fondo desconocida';
    };
  

    const handleSelect = (selectedIndex) => {
        const selectedImage = images[selectedIndex].src;
        setImageSelected(selectedImage);
        setCurrentIndex(selectedIndex);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: handleSelect,
        customPaging: i => (
            <button
                type="button"
                aria-label={`Ir a ${images[i].alt}`}
                className={`slick-dot-button ${i === currentIndex ? 'slick-dot-active' : ''}`}
            >
                {`Ir a ${images[i].alt}`}
            </button>
        ),
        appendDots: dots => (
            <ul className="slick-dots" role="tablist">
                {dots.map((dot, index) => (
                    <li key={index} role="presentation" className={index === currentIndex ? 'slick-active' : ''}>
                        {dot.props.children}
                    </li>
                ))}
            </ul>
        )
    };

    return (
        <Modal
            className="modal-container-owo"
            overlayClassName="modal-overlay-owo"
            isOpen={isOpen}
            onRequestClose={onClose}
            ariaHideApp={false}
            aria-labelledby="decoracion-title"
            role="dialog"
        >
            <div className="container-fluid" role="document" aria-describedby="decoracion-description">
                <div className='row-1'>
                    <div className="col">
                        <h1 id="decoracion-title" className='titulo-decoracion'>DECORACIÓN</h1>
                        <button type="button" className='volver' onClick={onClose} aria-label="Botón cerrar">
                            <img className="foto" src={VolverIcon} alt="cerrar" />
                        </button>
                    </div>
                </div>
                {children}

                <div className="row mt-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h2 id="decoracion-description" className='textos-decoracion'>Actual:</h2>
                            </div>
                        </div>
                        <img
                            src={imgActual}
                            className="fondo-actual"
                            tabIndex="0"
                            role="img"
                            aria-label={`Imagen de fondo actual: ${findAltBySrc(imgActual)}`}
                            style={{ maxHeight: "300px", objectFit: "cover", width: "100%" }}
                        />
                    </div>
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h2 id="decoracion-description" className='textos-decoracion'>Seleccionar:</h2>
                            </div>
                        </div>
                        <div className="slider  p-3 mt-" style={{ maxWidth: "750px" }}>
                            <Slider ref={sliderRef} {...settings} className="container-images">
                                {images.map((image, index) => (
                                    <div key={index} className="carousel-slide" role="tabpanel">
                                        <img
                                            className="d-block w-75 img-fluid mx-auto"
                                            src={image.src}
                                            alt={image.alt}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>

                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button onClick={() => img_func(imageSelected)} className="button-cambiar">Cambiar</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MenuDecoracion;