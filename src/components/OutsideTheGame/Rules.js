import React from 'react'
import './css/rules.css';


const Rules = () => {
  return (
    <div className="rules-content">
      <h1>Pravidlá</h1>
      <div className="rules-main-content">
        <h2>Princíp</h2>
        <div className="rules-principle">
            <p>Hľadať zhodný pár obrázkov pod obrázkom jokera.</p> 
            <img src={`../../pictures/joker.jpg`} alt="Pexeso img" />
        </div>

        <h2>Nastavenie levelu obtiažnosti</h2>
        <div className="rules-level">
            <ul>
              <li><b>Ľahký</b> - obrázky sa nemiešajú, ale uhádnuté sa vymažú a zvyšné sa posúvajú k sebe</li>
              <li><b>Stredný</b> - usporiadanie obrázkov sa mieša po každej neuhádnutej dvojici</li>
              <li><b>Ťažký</b> - usporiadanie obrázkov sa mieša takmer každú sekundu</li>
            </ul>
        </div>

      </div>
    </div>

  )
}

export default Rules