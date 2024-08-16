import { DivPicture } from './DivPicture.js';
import { useState } from "react";
import {_shuffleArray }from '../../_inc/_inc_functions.js'

const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
const doubleImgs= [...arrImg, ...arrImg];

//to shuffle before every game
_shuffleArray(doubleImgs)

//generate UUID random keys
const uuid = require('uuid')

//creation of 2-dimensional array: - out of component to make id´s stable
// ['123e4567-e89b-12d3-a456-426614174000', 'lightning'],
// ['123e4567-e89b-12d3-a456-426614174001', 'drop'],..
const imgsWithKeys = doubleImgs.map(pictureName => [uuid.v4(), pictureName]);

export const GameDivPictures = (props) =>{
  const [stticSource, setStticSource] = useState("");

      //array of img names -> div>img
      const divItems = imgsWithKeys.map(([id, pictureName]) =>

        <DivPicture key={id}         
                    pictureName={pictureName} 
                    stticSource={stticSource} 
                    level={props.level} 
                    shuffle={props.shuffle} 
                    setStticSource={setStticSource}
                    seconds={props.seconds}
                    intervalSecond={props.intervalSecond}
                    setIsRunning={props.setIsRunning}/>
     );

    return (
        <div className="row" id="row">

             {divItems}

        </div> 
    );
  }
  
