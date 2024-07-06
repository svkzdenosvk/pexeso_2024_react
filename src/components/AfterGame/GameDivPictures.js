import { DivPicture } from './DivPicture.js';
import { useState } from "react";


export const GameDivPictures = ({level, shuffle, seconds, intervalSecond}) =>{
  const [stticSource, setStticSource] = useState("");


    const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
    const doubleImgs= [...arrImg, ...arrImg];

      //array of img names -> div>img
      const divItems = doubleImgs.map((pictureName,index) =>

        <DivPicture key={index} 
                    pictureName={pictureName} 
                    stticSource={stticSource} 
                    level={level} 
                    shuffle={shuffle} 
                    setStticSource={setStticSource}
                    seconds={seconds}
                    intervalSecond={intervalSecond} />
     );

    return (
        <div className="row" id="row">

             {divItems}

        </div> 
    );
  }
  
