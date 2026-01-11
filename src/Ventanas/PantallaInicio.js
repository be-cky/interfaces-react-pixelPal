import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Logo from "../images/logo.png";
import FondoInicio from "../images/FondoInicio.png";
import './fondoPantallaInicio.css';
var sectionStyle = {
    backgroundImage: FondoInicio
}



function PantallaInicio({ setPlayMusic }) {
    
    const handleButtonClick = () => {
        setPlayMusic(false); // Activar la música cuando se haga clic en el botón
    };
    return (
        <> {/* d-flex align-items-center flex-column  img-fluid pt-5 mt-5 */}
            <div className="container titulo text-center">
                <img src={Logo} className="img-fluid" alt="Logo" />
                <h3 className="colorTextoHomepage"><strong></strong></h3>
            </div>




            <div className="d-flex justify-content-center align-items-center vh-100">
                <div > {/* Contenedor para el botón */}
                    <Link to="/nombre">
                        <button className="botonDegradado" button onClick={handleButtonClick}> PULSA PARA COMENZAR</button>
                    </Link>
                </div>
            </div>



        </>
    );
}
export default PantallaInicio;