import { useRef, useState ,useReducer } from "react";

import { _stylingAfterLevel,_shuffleArray } from "./_inc/_inc_functions";

import { GameDivPictures } from "./components/AfterGame/GameDivPictures";
import {SetLevelBtns} from "./components/BeforeGame/SetLevelBtns";
import {TimeAndStart} from "./components/AfterGame/TimeAndStart"

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COLOR':
      return { 
        ...state,
        color: action.payload
      }
    case 'SET_LEVEL':
      return {
        ...state,
        level: action.payload
      }
    default:
      return state;
  }
}

const defaultState = {
  level:"",
  color:"black",
}

const App = () =>{

 // ---------------------------useStates

let [seconds, setSeconds] = useState(0);
 
 // ---------------------------useRefs

 const intervalSecondRef = useRef(null); // Ref of  ID of iterval seconds ... according to chat GPT it´s quicker than useState, because it prevents re-rendering

 // ---------------------------useReducer

const [state,dispatch] = useReducer(reducer, defaultState)
/*-------------------------------------------------------------------------------------------------------------------------------------------- 
/*--------------------------------------------------------------------------------------------------------------------------------------------
/*--------------------------------------------------------------------------------------------------------------------------------------------*/

 // ---------------------------
 // ---------------------------set level fn´s
 // ---------------------------

  function _setLevelStyleChanges(colorText,colorBG,) { /*--------------------------- partial function for set level of the game (it´s also about change styles)*/
    
    //style -> color of H1, H3 and seconds
     dispatch({type: "SET_COLOR", payload: colorText })
    _stylingAfterLevel(colorBG);/*----------------------------------------------------partial f. with style changes after select level*/
  }
 
  function my_setLevel(e,leveliD ) {/*------------------------------------------------main f. for set level*/
    
     dispatch({type: "SET_LEVEL", payload: leveliD })
  
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

  if( state.level==="harder" || state.level==="hardest"){ /*this method is for the hardest level .. it´s maybe slower because of rerendering */
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
            <h1 style={{color: state.color}}>Pexeso</h1>
          
            <h3 style={{color: state.color}}>Vitajte v hre pexeso, pre začatie hry zvoľte náročnosť nižšie </h3>

            <div id="levelBtns"  >
              <SetLevelBtns my_setLevel={my_setLevel}/>
            </div>

            <TimeAndStart level={state.level} 
                       shuffle={shuffle} 
                       seconds={seconds} 
                       setSeconds={setSeconds} 
                       intervalSecondRef={intervalSecondRef}
                      //  dispatch={dispatch} 
                       color={state.color}/>
                    
         </div>
        
         <div className="column_content" id="content">
            <GameDivPictures level={state.level} shuffle={shuffle} seconds={seconds} intervalSecondRef={intervalSecondRef}
 /* dispatch={dispatch}*//> 
         </div>
    </>
  );
}

export default App;
