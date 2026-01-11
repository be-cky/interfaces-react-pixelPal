import './PantallaPrincipal.css';
import '../App.css';
import { useState } from "react";
import { useEffect } from "react";
import { usePet } from "../Components/PetContext";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import Pet from "../Components/Pet/Pet";
import Fondo from "../Components/Fondo/Fondo"
import MenuDecoracion from "../Components/MenuDecoracion/MenuDecoracion";
import InventarioComida from "../Components/InventarioComida/InventarioComida";
import Tienda from "../Components/Tienda/Tienda";
import fondobasico2 from '../images/fondo-images/fondobasico2.jpg';
import love_speech_balloon from "../images/love_speech.png";
import love_sound from "../sounds/I_love_you.mp3";
import comiendo from "../sounds/comiendo.mp3";
import limon from '../images/comida-images/limon.png';
import pera from '../images/comida-images/pera.png';
import fresa from '../images/comida-images/fresa.png';
import taco from '../images/taco.png';
import drink from '../images/drink.png';
import noodles from '../images/noodles.png';
import tarta from '../images/tarta.png';
import gomugomu from '../images/comida-images/gomugomu.png';
import bubble from '../images/comida-images/bubble-tea.png';
import burger from '../images/comida-images/burger.png';
import cocktail from '../images/comida-images/cocktail.png';
import cookie from '../images/comida-images/cookie.png';
import cupcake from '../images/comida-images/cupcake.png';
import icecream from '../images/comida-images/ice-cream.png';
import chicken from '../images/comida-images/fried-chicken.png';
import pizza from '../images/comida-images/pizza.png';
import watermelon from '../images/comida-images/watermelon.png';
import lasagne from '../images/comida-images/lasagne.png';

import BackgroundMusic from "../Components/BackgroundMusic";
import React, { useRef } from 'react';
import muted from '../images/muted.png';
import volume from '../images/volume.png';

function PantallaPrincipal({ isMusicPlaying, toggleMusic }) {

  const ref = useRef(null);

  const { petName, petImage } = usePet();

  // Estado para los atributos de la mascota

  const [affection, setAffection] = useState(10);
  const [hungriness, setHungriness] = useState(50);
  const [cleanliness, setCleanliness] = useState(10);
  const [showHeart, setShowHeart] = useState(false);
  const [showILoveYou, setShowILoveYou] = useState(false);
  const [cleaningMode, setCleaningMode] = useState(false);

  // Para mostrar cursor como esponja
  const handleCleaningMode = () => {
    if (cleanliness < 100) {
      setCleaningMode(true);
      document.body.classList.add('cursor-sponge');
    }
  };

  const handleCleaningDone = () => {
    setCleaningMode(false);
    document.body.classList.remove('cursor-sponge');
  };


  // Hook de React que te permite ejecutar efectos secundarios en componentes funcionales

  useEffect(() => {
    // Función de JavaScript que ejecuta repetidamente una función dada a intervalos establecidos (en milisegundos)
    const intervalId = setInterval(() => {

      setHungriness((currentH) => {

        let decreaseValue = 1;
        if (currentH >= 50 && currentH < 90) {
          decreaseValue = 2;
        }
        else if (currentH >= 0 && currentH < 50) {
          decreaseValue = 3;
        }

        return currentH > 0 ? currentH - decreaseValue : 0;
      });

    }, 1000 * 10); // decrementa cada 1 segundo IMPORTANTE: AUN SE DEBE ACLARAR CUANTOS SEGUNDOS ES LO OPTIMO EN UN ESCENARIO REAL

    // Siempre limpiar intervalos (si no pueden aparecer varios intervalos que actuen sobre el componente y provoca situaciones no esperadas)
    return () => clearInterval(intervalId);
  }, []); // El array vacío asegura que el efecto se ejecute solo después del montaje

  useEffect(() => {
    // Función de JavaScript que ejecuta repetidamente una función dada a intervalos establecidos (en milisegundos)
    const intervalId = setInterval(() => {
      setAffection((currentAffection) => {

        let decreaseValue = 1;

        if (currentAffection >= 50 && currentAffection < 90) {
          decreaseValue = 2;
        }
        else if (currentAffection >= 0 && currentAffection < 50) {
          decreaseValue = 3;
        }

        return currentAffection > 0 ? currentAffection - decreaseValue : 0;
      });
    }, 1000 * 30); // decrementa cada 20 segundo IMPORTANTE: AUN SE DEBE ACLARAR CUANTOS SEGUNDOS ES LO OPTIMO EN UN ESCENARIO REAL

    // Siempre limpiar intervalos (si no pueden aparecer varios intervalos que actuen sobre el componente y provoca situaciones no esperadas)
    return () => clearInterval(intervalId);
  }, []); // El array vacío asegura que el efecto se ejecute solo después del montaje


  useEffect(() => {
    if (cleanliness === 100) {
      handleCleaningDone();
    }
  }, [cleanliness]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCleanliness((currentCleanliness) => {

        return currentCleanliness > 0 ? currentCleanliness - 1 : 0;
      });
    }, 1000 * 30);
    return () => clearInterval(intervalId);
  }, []);




  // Funciones para cambiar el estado
  const increaseAffection = () => {
    console.log(affection)
    if (affection >= 0 && affection <= 25) setAffection(affection + 10);
    else if (affection > 25 && affection <= 50) setAffection(affection + 5);
    else if (affection > 50 && affection <= 75) setAffection(affection + 3);
    else if (affection > 75 && affection < 98) setAffection(affection + 2);
    else if (affection >= 98 && affection < 100) setAffection(affection + 1);

    if (affection === 100) {
      setShowHeart(false);
      new Audio(love_sound).play();
      setShowILoveYou(true);
      setTimeout(() => setShowILoveYou(false), 2500);
    }
  };


  function decreaseHungriness(ptos) {
    let value = hungriness + ptos;
    if (value > 100) {
      value = 100;
    }
    setHungriness(value);
    console.log(hungriness);
  }



  //rebeca working
  const [isDecoOpen, setIsDecoOpen] = useState(false);
  const closeDeco = () => {
    setIsDecoOpen(false);
  };

  const [isTiendaOpen, setIsTiendaOpen] = useState(false);
  const closeTienda = () => {
    setIsTiendaOpen(false);
  };

  const [fondoImage, setFondoImage] = useState(fondobasico2)
  const cambioFondo = (imageDeseada) => {
    setFondoImage(imageDeseada);
  };
  const [isFoodInventoryOpen, setFoodInventoyOpen] = useState(false);
  const closeInventory = () => {
    setShowFood(false);
    setComidaSelected("");
    setFoodInventoyOpen(false);
  };

  const [showFood, setShowFood] = useState(false);
  ;

  const [comidaSelected, setComidaSelected] = useState("")
  const seleccionarFood = (event) => {
    setComidaSelected(event.target.src);
    decreaseHungriness(parseInt(event.target.getAttribute('data-puntos')));
    const id = parseInt(event.target.getAttribute('data-id'));
    new Audio(comiendo).play();
    setProducts(products.map(producto => producto.id === id ? { ...producto, cantidad: producto.cantidad - 1 } : producto));
    setShowFood(true);
    setTimeout(() => setShowFood(false), 2500);
  };




  const [products, setProducts] = useState([
    { id: 1, imagen: fresa, nombre: 'fresa', precio: 5, cantidad: 3, puntos: 30, cantidadCarro: 0 },
    { id: 2, imagen: pera, nombre: 'pera', precio: 3, cantidad: 3, puntos: 10, cantidadCarro: 0 },
    { id: 3, imagen: limon, nombre: 'limon', precio: 2, cantidad: 3, puntos: 5, cantidadCarro: 0 },
    { id: 4, imagen: taco, nombre: 'taco', precio: 6, cantidad: 0, puntos: 20, cantidadCarro: 0 },
    { id: 5, imagen: drink, nombre: 'drink', precio: 1, cantidad: 0, puntos: 5, cantidadCarro: 0 },
    { id: 6, imagen: noodles, nombre: 'noodles', precio: 4, cantidad: 0, puntos: 10, cantidadCarro: 0 },
    { id: 7, imagen: tarta, nombre: 'tarta', precio: 10, cantidad: 0, puntos: 10, cantidadCarro: 0 },
    { id: 8, imagen: gomugomu, nombre: 'gomugomu', precio: 100, cantidad: 0, puntos: 100, cantidadCarro: 0 },
    { id: 9, imagen: bubble, nombre: 'bubble', precio: 2, cantidad: 0, puntos: 2, cantidadCarro: 0 },
    { id: 10, imagen: burger, nombre: 'burger', precio: 5, cantidad: 0, puntos: 20, cantidadCarro: 0 },
    { id: 11, imagen: cocktail, nombre: 'cocktail', precio: 8, cantidad: 0, puntos: 2, cantidadCarro: 0 },
    { id: 12, imagen: cookie, nombre: 'cookie', precio: 2, cantidad: 0, puntos: 5, cantidadCarro: 0 },
    { id: 13, imagen: cupcake, nombre: 'cupcake', precio: 5, cantidad: 0, puntos: 5, cantidadCarro: 0 },
    { id: 14, imagen: icecream, nombre: 'icecream', precio: 7, cantidad: 0, puntos: 5, cantidadCarro: 0 },
    { id: 15, imagen: chicken, nombre: 'chicken', precio: 4, cantidad: 0, puntos: 10, cantidadCarro: 0 },
    { id: 16, imagen: pizza, nombre: 'pizza', precio: 5, cantidad: 0, puntos: 20, cantidadCarro: 0 },
    { id: 17, imagen: watermelon, nombre: 'watermelon', precio: 4, cantidad: 0, puntos: 10, cantidadCarro: 0 },
    { id: 18, imagen: lasagne, nombre: 'lasagne', precio: 6, cantidad: 0, puntos: 30, cantidadCarro: 0 }
 

  ]);

  //<BackgroundMusic  src="/sounds/comiendo.mp3"/> 
  return (
  <>
    <div className="App">

      <Fondo image={fondoImage} />


      <Header
        petName={petName}
        affection={affection}
        hungriness={hungriness}
        cleanliness={cleanliness}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
        
      />

      <Pet
        image={petImage}
        cleaningMode={cleaningMode}
        cleanliness={cleanliness}
        setCleanliness={setCleanliness}
        showHeart={showHeart}
        increaseAffection={increaseAffection}

        ref={ref}
      />

      <Footer
        onActivateHeart={setShowHeart}
        onCleaningMode={handleCleaningMode}
        onHandleCleaningDone={handleCleaningDone}

        openDecoF={setIsDecoOpen}
        openInventary={setFoodInventoyOpen}
        openTiendita={setIsTiendaOpen}
        arrayProductos={products}
        modificarArray={setProducts}

        ref={ref}
      />


      <div className="food-container">
        {showFood && (<img className="food-icon" src={comidaSelected} alt="comida"></img>
        )}
      </div>
      <div className="food-message">
        {showFood && (<h1>Ñam!</h1>)}
      </div>
      <div className="speech-balloon-container">
        {showILoveYou && (<img className="speech-balloon-icon" src={love_speech_balloon} alt="i love you speech balloon"></img>
        )}
      </div>


      <MenuDecoracion isOpen={isDecoOpen}
        onClose={closeDeco}
        img_func={cambioFondo}
        imgActual={fondoImage} />

      <InventarioComida isOpen={isFoodInventoryOpen}
        onClose={closeInventory}
        seleccionarComida={seleccionarFood}
        showComida={setShowFood}
        arrayProductos={products}

      />

      <Tienda isOpen={isTiendaOpen}
        onClose={closeTienda}
        arrayProductos={products}
        modificarArray={setProducts}
      />

    </div>
  </>
  );
}
export default PantallaPrincipal;