import React, { useState } from "react";

const uuid = require('uuid')
const gameNumber = uuid.v4()//--------------------------------------unique string

const GameSettings = () => {
  const [levelChosen, setlevelChosen] = useState(""); 
  // const [selectedImages, setSelectedImages] = useState([]); //---choosen images
  const [imgCountChosen, setimgCountChosen] = useState(null); //----count of choosen images
  const [error, setError] = useState(""); 


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

      
      <fieldset> {/* -----------------------------------------------choose level */}
        <legend>Vyberte úroveň obtiažnosti:</legend>
        <label>
          <input
            type="radio"
            name="level"
            value="easy"
            onChange={(e) => setlevelChosen(e.target.value)}
          />
          Ľahký
        </label>
        <label>
          <input
            type="radio"
            name="level"
            value="medium"
            onChange={(e) => setlevelChosen(e.target.value)}

          />
          Stredný
        </label>
        <label>
          <input
            type="radio"
            name="level"
            value="hard"
            onChange={(e) => setlevelChosen(e.target.value)}
          />
          Ťažký
        </label>
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

      <fieldset>{/* -----------------------------------------------choose count of images */}
        <legend>Vyberte počet obrázkov:</legend>
        <label>
          <input
            type="radio"
            name="imageCount"
            value="5"
            onChange={(e) => setimgCountChosen(parseInt(e.target.value,10))}
          />
          10
        </label>
        <label>
          <input
            type="radio"
            name="imageCount"
            value="6"
            onChange={(e) => setimgCountChosen(parseInt(e.target.value,10))}
          />
          12
        </label>
        <label>
          <input
            type="radio"
            name="imageCount"
            value="7"
            onChange={(e) => setimgCountChosen(parseInt(e.target.value,10))}
          />
          14
        </label>
        <label>
          <input
            type="radio"
            name="imageCount"
            value="8"
            onChange={(e) => setimgCountChosen(parseInt(e.target.value,10))}
          />
          16
        </label>
      </fieldset>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* ------error message */} 

      <button type="submit">Hraj</button>
    </form>
  );
};

export default GameSettings;
