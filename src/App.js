import { useState } from "react";

import { _stylingAfterLevel,_shuffleArray } from "./_inc/_inc_functions";

import { GameDivPictures } from "./components/AfterGame/GameDivPictures";
import {SetLevelBtns} from "./components/BeforeGame/SetLevelBtns";
import {TimeAndStart} from "./components/AfterGame/TimeAndStart"

const App = () =>{

 // ---------------------------
 // ---------------------------useStates
 // ---------------------------

  const [level, setLevel] = useState();
  const [color, setColor] = useState("");

  let [seconds, setSeconds] = useState(0);
  let [intervalSecond, setIntervalSecond] = useState(0);

  // ---------------------------
 // ---------------------------set level fn´s
 // ---------------------------

  function _setLevelStyleChanges(colorText,colorBG,) { /*--------------------------- partial function for set level of the game (it´s also about change styles)*/
    
    //style -> color of H1, H3 and seconds
    setColor(colorText);
    
    _stylingAfterLevel(colorBG);/*----------------------------------------------------partial f. with style changes after select level*/
  }
 
  function my_setLevel(e,leveliD ) {/*------------------------------------------------main f. for set level*/
    
    setLevel(leveliD)
  
      switch (e.target.id) {
      
        case "harder":
          _setLevelStyleChanges("white", "#4d141d");
          break;
        case "hardest":
          _setLevelStyleChanges("white", "black");
          break;
        case "normal":        
          _setLevelStyleChanges("black");
          break;
        default:
          break;      
      }
  }

 // ---------------------------
 // ---------------------------shuffle function
 // ---------------------------
 
function shuffle(){/*-------------------------------------------------------------function for shuffling (ONLY) in harder and the hardest version of game*/

  if(level!=="hardest"){
    //this is quicker version of shuffling but in level "hardest" it´s not working correctly
    if(level==="harder"|| seconds===0){
  
       //get HTMLcollection of pictures
       let x= document.getElementsByTagName("img");/*--------------------collection of divs above image*/

       let arrSrc=[];/*--------------------------------------------------array of clean paths */
       let arr = Array.from(x);/*----------------------------------------convert collection to array*/
       arr.forEach((element) => {
        const startIndex = element.src.indexOf('pictures'); /*-----------cut a path before word "picture" ... like "http://localhost:3000/" */
        const srcPath = element.src.substring(startIndex);
        arrSrc.push(srcPath)
       })
      
       _shuffleArray(arrSrc);/*--------------------------------------------------------partial f. to random shuffle of array, f. included from _inc_functions.js */

       arr.forEach((element,index) => {element.src =arrSrc[index]});
    } 
  } else { /*this method is for the hardest level .. it´s maybe slower because of rerendering */
     //get HTMLcollection
     let x= document.getElementsByClassName("div_on_click");/*--------------------collection of divs above image*/

     //convert collection to array
     let arr = Array.from(x);
     _shuffleArray(arr);/*--------------------------------------------------------partial f. to random shuffle of array, f. included from _inc_functions.js */

     //remove old collection
     let row = document.getElementById("row");
     row.innerHTML="";
      
     // add new random order of collection
     for(let i = 0; i < arr.length; i++){
          row.appendChild(arr[i]);
     }
  }           
}

  return (
    <>
         <div className="welcome">
            <h1 style={{color}}>Pexeso</h1>
          
            <h3 style={{color}}>Vitajte v hre pexeso, pre začatie hry zvoľte náročnosť nižšie </h3>

            <div id="levelBtns"  >
              <SetLevelBtns my_setLevel={my_setLevel}/>
            </div>

            <TimeAndStart level={level} 
                       shuffle={shuffle} 
                       seconds={seconds} 
                       setSeconds={setSeconds} 
                       setIntervalSecond={setIntervalSecond}
                       color={color}/> 
         </div>
        
         <div className="column_content" id="content">
            <GameDivPictures level={level} shuffle={shuffle} seconds={seconds} intervalSecond={intervalSecond}/> 
         </div>
    </>
  );
}

export default App;
