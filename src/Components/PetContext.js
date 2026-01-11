// Creamos un archivo PetContext.js
import React, { useState, createContext, useContext } from 'react';
import regularPet from "../images/pet-images/pou-regular.png";

const PetContext = createContext();

// Hook personalizado 
// Cualquier componente que llame a usePet recibira los valores actuales de petName y setPetName
export function usePet() {
  return useContext(PetContext);
}

// Componente 
export const PetProvider = ({ children }) => {
  const [petName, setPetName]   = useState('');
  const [petImage, setPetImage] = useState(regularPet);
  const [money, setMoney]       = useState(100);
  const [showHeart, setShowHeart] = useState(false);

  return (
    <PetContext.Provider value={{ petName, setPetName, petImage, setPetImage, money, setMoney, showHeart, setShowHeart}}>
      {children}
    </PetContext.Provider>
  );
};
