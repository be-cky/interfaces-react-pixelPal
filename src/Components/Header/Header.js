import StatusBar from "../StatusBar/StatusBar";
import "./Header.css";
import Ayuda from "../Ayuda/Ayuda";
import { useState } from "react";
import foodLogo from '../../images/food-icon-status-bar.png';
import heartLogo from '../../images/heart-status-logo.png';
import cleanLogo from '../../images/cleaning-status-logo.png';
import coin from '../../images/coin.png';
import { usePet } from "../PetContext";
import Button from 'react-bootstrap/Button';
import muted from '../../images/muted.png';
import volume from '../../images/volume.png';

function Header({petName, affection, hungriness, cleanliness,isMusicPlaying, toggleMusic}) {
  function colorHandler(affection) {
    if (affection < 30) return "red";
    if (affection < 70) return "orange";
    if (affection <= 100) return "lime";
  }

  const { money } = usePet();
  const [modalShow, setModalShow] = useState(false);

  return (
    <header>
      <div className="pet-info">
        <h1 tabIndex="0" aria-label={`Nombre de la mascota: ${petName}`} className="pet-name">{petName}</h1>
        
        <StatusBar 
          logo={heartLogo}
          value={affection} 
          max={100} 
          color={colorHandler(affection)} 
          ariaLabel={`Barra de vida con un valor de ${affection} sobre un máximo de 100`} 
        />
        <StatusBar 
          logo={foodLogo} 
          value={hungriness} 
          max={100} 
          color={colorHandler(hungriness)} 
          ariaLabel={`Barra de comida con un valor de ${hungriness} sobre un máximo de 100`} 
        />
        <StatusBar 
          logo={cleanLogo} 
          value={cleanliness} 
          max={100} 
          color={colorHandler(cleanliness)} 
          ariaLabel={`Barra de limpieza con un valor de ${cleanliness} sobre un máximo de 100`} 
        />
      </div>

      <>
        <Button aria-label="Botón de ayuda" className="help-button" onClick={() => setModalShow(true)}>
          ?
        </Button>
        <Ayuda show={modalShow} onHide={() => setModalShow(false)} />
      </>

      <>
      <button onClick={toggleMusic} className="music-control-button">
        <img className='musicaepica' 
          src={isMusicPlaying ? volume : muted}
          alt="Controlar música"                
        />
      </button>
      </>

      <div>
        <img className="icon" src={coin} alt="Icono de moneda"></img>
        <h2 tabIndex="0" aria-label={`Total: ${money} monedas`} className="pet-name">total: {money}</h2>
      </div>
    </header>
  );
}

export default Header;
