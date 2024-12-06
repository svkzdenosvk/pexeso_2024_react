import { useRef, useReducer, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js"; //this provide crypting and decrypting params in URL

import { _stylingAfterLevel } from "../../_inc/_inc_functions";

import { GameDivPictures } from "./GameDivPictures";
import {TimeAndStart} from "./TimeAndStart"


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
        level: action.payload,
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
  isEnd:false,
}

const AppGame = () =>{

 // ---------------------------useRefs

 const intervalSecondRef = useRef(null); // Ref of  ID of interval seconds ... according to chat GPT it´s quicker than useState, because it prevents re-rendering

 const imgCountRef = useRef(null);

 // ---------------------------useReducer

 const [state,dispatch] = useReducer(reducer, defaultState)

 //----------------------------useState

 const [isLoaded, setIsLoaded] = useState(true);

 /*--------------------------------------------------------------------------------------------------------------------------------------------
 /*--------------------------------------------------------------------------------------------------------------------------------------------*/
 
 let settingsData=useParams().settings
 const navigate = useNavigate();


 useEffect(() => {
  if (settingsData) { // if params were sent

  const secretKey = "encryption-key-for-settings"; // same key as on settings page 
  const simpleCrypto = new SimpleCrypto(secretKey);

    try {
      // decrypting of data
      const decryptedSettings = simpleCrypto.decrypt(decodeURIComponent(settingsData));

      if (
        !["easy", "medium", "hard"].includes(decryptedSettings.level) || 
        ![5, 6, 7, 8].includes(decryptedSettings.imgCount)
      ){
       // _setLevelStyleChanges("black","white",)
      
       navigate('/settings'); 
       if(["medium", "hard"].includes(decryptedSettings.level)){
         window.location.reload(); //reset color changes (background, ..) 
       }

      }    
     
          dispatch({type: "SET_LEVEL", payload: decryptedSettings.level })
          imgCountRef.current=decryptedSettings.imgCount;
    
          const levelChanges = {
            easy:  ["black"],
            medium:["white", "#4d141d"],
            hard:  ["white","black"]
          }

          _setLevelStyleChanges(levelChanges[decryptedSettings.level][0],levelChanges[decryptedSettings.level][1]); /*---using dynamic object properties instead of switch*/ 
    
    } catch (error) {
      console.error("Dešifrovanie zlyhalo:", error);
      navigate('/settings'); 

    }
  }else{
    // _setLevelStyleChanges("black","white",)
    
    navigate('/settings'); 
    // window.location.reload();
   
  }
}, [ settingsData, dispatch, navigate]); 


// ---------------------------
 // ---------------------------set level fn´s
 // ---------------------------

  function _setLevelStyleChanges(colorText,colorBG,) { /*--------------------------- partial function for set level of the game (it´s also about change styles)*/
    
    //style -> color of H1, H3 and seconds
    dispatch({type: "SET_COLOR", payload: colorText })
    
    _stylingAfterLevel(colorBG);/*---------------------------------------------------partial f. with style changes after select level*/
  }
 

  return (
    <>
         <div className="welcome">
         
            {state.isEnd &&  <a href="/settings" className="end-game-btn" > Hraj znova </a>}

            {!state.isRunning && <a href="/" className="end-game-btn" > Poď na hlavnú stránku </a>}

            <a href="/settings" className="end-game-btn" > {linkName} </a>

                      
            <h3 style={{color: state.color}}> </h3>

            <TimeAndStart
                       seconds={state.seconds} 
                       dispatch={dispatch}
                       intervalSecondRef={intervalSecondRef}
                       color={state.color}
                       isRunning={state.isRunning}
                       /> 
         </div>
        
         <div className="column_content" id="content">
                <GameDivPictures level={state.level} seconds={state.seconds} intervalSecondRef={intervalSecondRef} 
                                 color={state.color} isRunning={state.isRunning} 
                                 dispatch={dispatch} selectedImgCount={ imgCountRef.current} 
                                 isEnd={state.isEnd} setIsLoaded={setIsLoaded} isLoaded={isLoaded}/> 
         </div>

    </>
  );
}

export default AppGame;
