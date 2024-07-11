import { DivPicture } from './DivPicture.js';
import { useState } from "react";


export const GameDivPictures = (props) =>{
  const [stticSource, setStticSource] = useState("");


    const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
    const doubleImgs= [...arrImg, ...arrImg];

      //array of img names -> div>img
      const divItems = doubleImgs.map((pictureName,index) =>

        <DivPicture key={index} 
                    pictureName={pictureName} 
                    stticSource={stticSource} 
                    level={props.level} 
                    shuffle={props.shuffle} 
                    setStticSource={setStticSource}
                    seconds={props.seconds}
                    intervalSecond={props.intervalSecond} />
     );

    return (
        <div className="row" id="row">

             {divItems}

        </div> 
    );
  }
  
