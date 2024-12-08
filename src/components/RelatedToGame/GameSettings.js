import React, { useState } from "react";
import './css/gameSettings.css';

const uuid = require('uuid')
const gameNumber = uuid.v4()//--------------------------------------unique string

const GameSettings = () => {
  const [levelChosen, setlevelChosen] = useState(""); 
  // const [selectedImages, setSelectedImages] = useState([]); //---choosen images
  const [imgCountChosen, setimgCountChosen] = useState(null); //----count of choosen images
  const [error, setError] = useState(""); 

  const imgCount = [5, 6, 7, 8]; // --------------------------------count of images for game 

  const levels = [
    { value: "easy", label: "Ľahký" },
    { value: "medium", label: "Stredný" },
    { value: "hard", label: "Ťažký" },
  ];

  // const imageOptions = ["vesmir", "kvapka", "more", "sun", "vibracia", "vietor", "drevo", "blesk"];
 
  // let levelChosen="";
  // let imgCountChosen=null;
  // const handleImageSelection = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedImages((prev) => [...prev, value]);
  //   } else {
  //     setSelectedImages((prev) => prev.filter((img) => img !== value));
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!levelChosen){
    
      setError("Nastav level obtiažnosti")
      return
    } else if(!imgCountChosen){
      setError("Nastav počet obrázkov, s ktorými chceš hrať.")
      return
    }else{ 
      setError(""); //----------------------------------------------reset error message
    }
  
  
  const SimpleCrypto = require("simple-crypto-js").default;//-------import SimpleCrypto

  const secretKey = "encryption-key-for-settings"; //---------------shared key on both sides
  const simpleCrypto = new SimpleCrypto(secretKey);
  
  const chosenSettings = {
    level: levelChosen,
    imgCount: imgCountChosen,
    gameId: gameNumber
  };
   
  // const encryptedSettings = simpleCrypto.encrypt(chosenSettings);
  const encryptedSettings = simpleCrypto.encrypt(JSON.stringify(chosenSettings));//--encrypt data

  window.location.href = `/game/${encodeURIComponent(encryptedSettings)}`;

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nastavte parametre hry</h2>

      <fieldset>
        <legend>Vyberte úroveň obtiažnosti:</legend>{/* -----------choose level */}
        {levels.map((level, index) => (
          <label key={index}>
            <input
              type="radio"
              name="level"
              value={level.value}
              onChange={(e) => setlevelChosen(e.target.value)}
            />
            {level.label}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Vyberte počet obrázkov:</legend>{/* --------------------choose count of images to play*/}
        {imgCount.map((value, index) => (
          <label key={index}>
            <input
              type="radio"
              name="imageCount"
              value={value}
              onChange={(e) => setimgCountChosen(parseInt(e.target.value, 10))}
            />
            {value * 2} {/* ---------------------------------------------pair is 5 * 2 = 10) */}
          </label>
        ))}
      </fieldset>

          {/* Checklist of images
      <fieldset>
        <legend>Vyberte obrázky:</legend>
        {imageOptions.map((image) => (
          <label key={image}>
            <input
              type="checkbox"
              value={image}
              onChange={handleImageSelection}
            />
            {image}
          </label>
        ))}
      </fieldset> */}

      {error && <p>{error}</p>} {/* -------------------------------------error message */} 

      <button type="submit">Hraj</button>
    </form>
  );
};

export default GameSettings;
