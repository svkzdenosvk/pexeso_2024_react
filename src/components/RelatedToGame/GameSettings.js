import React, { useState } from "react";

const uuid = require('uuid')
const gameNumber = uuid.v4()

const GameSettings = () => {
  const [levelChosen, setlevelChosen] = useState(""); // Uchováva vybraný level
  // const [selectedImages, setSelectedImages] = useState([]); // Uchováva zaškrtnuté obrázky
  const [imgCountChosen, setimgCountChosen] = useState(null); // Uchováva počet obrázkov
  const [error, setError] = useState(""); // Uchováva chybové hlásenie


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
    // console.log(levelChosen)
    // console.log(imgCountChosen)

    if (!levelChosen){
    
      setError("Nastav level obtiažnosti")
      return
    } else if(!imgCountChosen){
      setError("Nastav počet obrázkov, s ktorými chceš hrať.")
      return
    }else{ 
      setError(""); // reset error message
    }
  
    // import SimpleCrypto
  const SimpleCrypto = require("simple-crypto-js").default;

  const secretKey = "encryption-key-for-settings"; // shared key on both sides
  const simpleCrypto = new SimpleCrypto(secretKey);
  
  const chosenSettings = {
    level: levelChosen,
    imgCount: imgCountChosen,
    gameId: gameNumber
  };
  
  // Šifrovanie dát
  // const encryptedSettings = simpleCrypto.encrypt(chosenSettings);
  const encryptedSettings = simpleCrypto.encrypt(JSON.stringify(chosenSettings));

  // window.location.href = `/game/${encryptedSettings}`;

  window.location.href = `/game/${encodeURIComponent(encryptedSettings)}`;

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Nastavte parametre hry</h2>

      {/* Výber obtiažnosti */}
      <fieldset>
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
            // onChange={(e) => levelChosen=e.target.value}

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

      {/* Checklist obrázkov
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

      {/* Výber počtu obrázkov */}
      <fieldset>
        <legend>Vyberte počet obrázkov:</legend>
        <label>
          <input
            type="radio"
            name="imageCount"
            value="5"
            onChange={(e) => setimgCountChosen(parseInt(e.target.value,10))}
            // onChange={(e) => setimgCountChosen=parseInt(e.target.value,10)}

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

      {/* Chybové hlásenie */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Odoslať</button>
    </form>
  );
};

export default GameSettings;
