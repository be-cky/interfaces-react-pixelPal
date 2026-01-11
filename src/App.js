import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PantallaInicio from "./Ventanas/PantallaInicio";
import PantallaNombre from "./Ventanas/PantallaNombre";
import PantallaSeleccion from "./Ventanas/PantallaSeleccion";
import PantallaPrincipal from "./Ventanas/PantallaPrincipal";
import BackgroundMusic from "./Components/BackgroundMusic";
import { PetProvider } from "./Components/PetContext";
import Game from "./Components/Game/Game";
// <BackgroundMusic src="./sounds/comiendo.mp3" /> 

function App() {
  const [playMusic, setPlayMusic] = useState(false);

  const toggleMusic = () => {
    setPlayMusic(prevPlayMusic => !prevPlayMusic);
  };
  return (
    <>

      <PetProvider>
        <BackgroundMusic play={playMusic} />
        <Routes>

          <Route
            path="/"
            element={
              <>

                <PantallaInicio setPlayMusic={setPlayMusic} />

              </>
            }
          />
          <Route
            path="/nombre"
            element={
              <>
                <PantallaNombre
                  isMusicPlaying={playMusic}
                  toggleMusic={toggleMusic} />
              </>
            }
          />

          <Route
            path="/seleccion"
            element={
              <>
                <PantallaSeleccion
                  isMusicPlaying={playMusic}
                  toggleMusic={toggleMusic} />
              </>
            }
          />

          <Route
            path="/principal"
            element={
              <>
                <PantallaPrincipal
                  isMusicPlaying={playMusic}
                  toggleMusic={toggleMusic} />
              </>
            }
          />
          <Route
            path="/game"
            element={
              <>
                <Game />
              </>
            }
          />
        </Routes>
      </PetProvider>
    </>
  );
}

export default App;