import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePet } from "../PetContext";
import "./Game.css"; // Importar el archivo CSS
import coinImage from "../../images/coin.png"; // Ruta a la imagen de la moneda
import bombImage from "../../images/bomb.png"; // Ruta a la imagen de la bomba
import arrows from "../../images/arrows-instruction.png";
import heartImage from "../../images/heart-life.png";

import money_sound from "../../sounds/money_sound.mp3";
import bomb_sound from "../../sounds/bomb_sound.mp3";

const Game = () => {
  const { money, setMoney, petImage } = usePet();
  const [position, setPosition] = useState(window.innerWidth / 2);
  const [coins, setCoins] = useState([]);
  const [bombs, setBombs] = useState([]); // Estado para las bombas
  const [timeLeft, setTimeLeft] = useState(60); // Agregar estado para el temporizador
  const [isGameOver, setIsGameOver] = useState(false);
  const gameContainerRef = useRef(null);
  const requestRef = useRef();
  const [showBeginMessageBox, setShowBeginMessageBox] = useState(true);
  const [dificultyLevel, setDificultyLevel] = useState(900);
  const [moneyScore, setMoneyScore] = useState(0);
  const [bombHits, setBombHits] = useState(0);

  function handleGameStart(dificulty) {
    if (dificulty === "facil") setDificultyLevel(1050);
    else if (dificulty === "medio") setDificultyLevel(650);
    else if (dificulty === "dificil") setDificultyLevel(420);
    else if (dificulty === "muyDificil") setDificultyLevel(270);

    setShowBeginMessageBox(false);
    setTimeLeft(60);
    gameContainerRef.current.focus(); // Asegurar el foco en el contenedor del juego
  }

  const resetGame = () => {
    setPosition(window.innerWidth / 2);
    setCoins([]);
    setBombs([]);
    setTimeLeft(60);
    setIsGameOver(false);
    setMoneyScore(0);
    setBombHits(0);
    setShowBeginMessageBox(true);
  };

  useEffect(() => {
    gameContainerRef.current.focus();
  }, []);

  // Movimiento de la mascota
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(prev - 10, 0));
    } else if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(prev + 10, window.innerWidth - 100)); // Ajustar el tamaño del pet
    }
  };

  // Manejo del arrastre horizontal
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", null); // Requerido para habilitar arrastre en Firefox
  };

  const handleDrag = (e) => {
    if (e.clientX > 0 && e.clientX < window.innerWidth - 100) {
      setPosition(e.clientX);
    }
  };

  // Manejo del movimiento en dispositivos táctiles
  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touch.clientX > 0 && touch.clientX < window.innerWidth - 100) {
      setPosition(touch.clientX);
    }
  };

  // Generar nuevas monedas
  useEffect(() => {
    if (isGameOver || showBeginMessageBox) return; // Detener la generación de monedas si el juego ha terminado o el modal está visible
    const interval = setInterval(() => {
      setCoins((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * (window.innerWidth - 100),
          y: 0,
        },
      ]);
    }, dificultyLevel + 200); //se le añade 200 para que tarde un poco la generacion de monedas comparado con la de las bombas

    return () => clearInterval(interval);
  }, [isGameOver, dificultyLevel, showBeginMessageBox]);

  // Generar nuevas bombas
  useEffect(() => {
    if (isGameOver || showBeginMessageBox) return; // Detener la generación de bombas si el juego ha terminado o el modal está visible
    const interval = setInterval(() => {
      setBombs((prev) => [
        ...prev,
        {
          id: Math.random(),
          x: Math.random() * (window.innerWidth - 100),
          y: 0,
        },
      ]);
    }, dificultyLevel); // Generar bombas a un intervalo diferente según el nivel de dificultad

    return () => clearInterval(interval);
  }, [isGameOver, dificultyLevel, showBeginMessageBox]);

  // Mover monedas y bombas hacia abajo y verificar colisiones usando requestAnimationFrame
  const moveItems = () => {
    if (showBeginMessageBox || isGameOver) return;
    setCoins((prev) =>
      prev
        .map((coin) => ({ ...coin, y: coin.y + 1.5 })) // Incremento ligero en la velocidad de caída
        .filter((coin) => {
          const petCenterX = position + 50; // Ancho del pet / 2
          const petCenterY = window.innerHeight - 100; // Alto del pet / 2

          const coinCenterX = coin.x + 50; // Ancho de la moneda / 2
          const coinCenterY = coin.y + 50; // Alto de la moneda / 2

          const distanceX = Math.abs(petCenterX - coinCenterX);
          const distanceY = Math.abs(petCenterY - coinCenterY);

          const isColliding = distanceX < 50 && distanceY < 50; // 50 es la mitad del ancho o alto del pet
          if (isColliding) {
            new Audio(money_sound).play();
            setMoneyScore(moneyScore + 1);
            return false;
          }
          return coin.y < window.innerHeight;
        })
    );

    setBombs((prev) =>
      prev
        .map((bomb) => ({ ...bomb, y: bomb.y + 2 })) // Incremento ligero en la velocidad de caída
        .filter((bomb) => {
          const petCenterX = position + 50; // Ancho del pet / 2
          const petCenterY = window.innerHeight - 100; // Alto del pet / 2

          const bombCenterX = bomb.x + 50; // Ancho de la bomba / 2
          const bombCenterY = bomb.y + 50; // Alto de la bomba / 2

          const distanceX = Math.abs(petCenterX - bombCenterX);
          const distanceY = Math.abs(petCenterY - bombCenterY);

          const isColliding = distanceX < 50 && distanceY < 50; // 50 es la mitad del ancho o alto del pet
          if (isColliding) {
            new Audio(bomb_sound).play();
            setBombHits(bombHits + 1);
            if (bombHits + 1 >= 3) {
              setIsGameOver(true);
            }
            return false;
          }
          return bomb.y < window.innerHeight;
        })
    );

    requestRef.current = requestAnimationFrame(moveItems);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(moveItems);
    return () => cancelAnimationFrame(requestRef.current);
  }, [coins, bombs, position, showBeginMessageBox, bombHits]);

  // Temporizador del juego
  useEffect(() => {
    if (isGameOver || showBeginMessageBox) return; // Detener el temporizador si el juego ha terminado o el modal está visible
    if (timeLeft === 0) {
      setIsGameOver(true);
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isGameOver, showBeginMessageBox]);

  // Actualizar el dinero al finalizar el juego
  const handleMoneyUpdate = () => {
    setMoney((prevMoney) => prevMoney + moneyScore);
  };

  return (
    <div
      className="game-container"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onTouchMove={handleTouchMove}
      ref={gameContainerRef}
    >
      {showBeginMessageBox ? (
        <div className="modalJuego">
          <div className="row-1">
            <h1>Bienvenido al juego</h1>
          </div>
          <div className="row">
            <div className="col-md-8">
              <h2>Controles:</h2>
              <img src={arrows} alt="Controles de flechas" className="controls-img" />
            </div>
            <div className="col-md-4">
              <div className="row">
                <button
                  className="button"
                  onClick={() => handleGameStart("facil")}
                >
                  Jugar nivel fácil
                </button>
              </div>
              <div className="row">
                <button
                  className="button"
                  onClick={() => handleGameStart("medio")}
                >
                  Jugar nivel medio
                </button>
              </div>
              <div className="row">
                <button
                  className="button"
                  onClick={() => handleGameStart("dificil")}
                >
                  Jugar nivel difícil
                </button>
              </div>
              <div className="row">
                <button
                  className="button"
                  onClick={() => handleGameStart("muyDificil")}
                >
                  Jugar nivel muy difícil
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Link to="/principal">
                <button className="button" onClick={handleMoneyUpdate}>
                  Salir
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : !isGameOver ? (
        <>
          <div
            className="pet"
            style={{ left: position, backgroundImage: `url(${petImage})` }}
            draggable="true"
            onDragStart={handleDragStart}
            onDrag={handleDrag}
          ></div>
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="coin"
              style={{
                left: coin.x,
                top: coin.y,
                backgroundImage: `url(${coinImage})`,
              }}
            ></div>
          ))}
          {bombs.map((bomb) => (
            <div
              key={bomb.id}
              className="bomb"
              style={{
                left: bomb.x,
                top: bomb.y,
                backgroundImage: `url(${bombImage})`,
              }}
            ></div>
          ))}

          <div className="score">Dinero: {moneyScore}</div>
          <div className="timer">Tiempo: {timeLeft}s</div>

          <Link to="/principal">
            <button className="button-salir">Salir</button>
          </Link>

          {/* fila de corazones */}
          <div className="hearts-container">
            <div className="row justify-content-center align-items-center">
              <div className="col-auto p-0 md-1">
                {bombHits <= 0 && (
                  <img src={heartImage} alt="Heart" className="img-fluid" />
                )}
              </div>
              <div className="col-auto p-0 md-1">
                {bombHits <= 1 && (
                  <img src={heartImage} alt="Heart" className="img-fluid" />
                )}
              </div>
              <div className="col-auto p-0 md-1">
                {bombHits <= 2 && (
                  <img src={heartImage} alt="Heart" className="img-fluid" />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="game-over">
          <div className="row">
            <h1>Game Over</h1>
          </div>

          <div className="conseguido">
            <p>Has conseguido: {moneyScore}</p>{" "}
            <img className="icon-p" src={coinImage} alt="coin" />
          </div>

          <div className="row">
            <div className="col-md-6">
              <Link to="/game">
                <button
                  className="button"
                  onClick={() => {
                    handleMoneyUpdate();
                    resetGame();
                  }}
                >
                  Volver a jugar
                </button>
              </Link>
            </div>

            <div className="col-md-6">
              <Link to="/principal">
                <button className="button" onClick={handleMoneyUpdate}>
                  Salir
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
