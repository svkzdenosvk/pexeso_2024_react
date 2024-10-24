import { useRef, useReducer } from "react";

import { _stylingAfterLevel, handleRefresh } from "./_inc/_inc_functions";

import { GameDivPictures } from "./components/AfterGame/GameDivPictures";
import {SetLevelBtns} from "./components/BeforeGame/SetLevelBtns";
import {TimeAndStart} from "./components/AfterGame/TimeAndStart"

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECONDS':
      return { 
        ...state,
        seconds: state.seconds + 1
      }
    case 'SET_START_GAME':
      return { 
        ...state,
        isRunning: true
      }  
    case 'SET_STOP_GAME':
    return { 
      ...state,
      isRunning: false,
      isEnd: true
    } 
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
  seconds:0,
  isRunning:false,
  isEnd:false
}

const AppGame = () =>{

 // ---------------------------useRefs

 const intervalSecondRef = useRef(null); // Ref of  ID of interval seconds ... according to chat GPT it´s quicker than useState, because it prevents re-rendering
 const intervalShuffleHardestRef = useRef(null); // Ref of  ID of interval in hardest level for shuffeling

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
    
    _stylingAfterLevel(colorBG);/*---------------------------------------------------partial f. with style changes after select level*/
  }
 
  function my_setLevel(levelName) {/*------------------------------------------------main f. for set level*/
    
    dispatch({type: "SET_LEVEL", payload: levelName })
  
    const levelChanges = {
      normal:  ["black"],
      harder:  ["white", "#4d141d"],
      hardest: ["white","black"]
    }

   _setLevelStyleChanges(levelChanges[levelName][0],levelChanges[levelName][1]); /*---using dynamic object properties instead of switch*/ 

  }

  return (
    <>
         <div className="welcome">
         
            <h1 style={{color: state.color}}>Pexeso</h1>
            {state.isEnd &&  <button onClick={handleRefresh}>Klikni a vyskúšaj to znova </button>}

          
            <h3 style={{color: state.color}}>Vitajte v hre pexeso, pre začatie hry zvoľte náročnosť nižšie </h3>

            <div id="levelBtns"  >
              <SetLevelBtns my_setLevel={my_setLevel}/>
            </div>

            <TimeAndStart
                       seconds={state.seconds} 
                       dispatch={dispatch}
                       intervalSecondRef={intervalSecondRef}
                       color={state.color}
                       isRunning={state.isRunning}
                       /> 
         </div>
        
         <div className="column_content" id="content">
                <GameDivPictures level={state.level} seconds={state.seconds} intervalSecondRef={intervalSecondRef} intervalShuffleHardestRef={intervalShuffleHardestRef} isRunning={state.isRunning} dispatch={dispatch}/> 
         </div>

    </>
  );
}

export default AppGame;
