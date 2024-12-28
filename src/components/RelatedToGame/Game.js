import { useReducer, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SimpleCrypto from "simple-crypto-js"; //------------------------this provide crypting and decrypting params in URL

import { GameDivPictures } from "./GameDivPictures";
import {TimeAndStart} from "./TimeAndStart"


const reducer = (state, action) => {
  switch (action.type) {
   
    case 'SET_START_GAME':
      return { 
        ...state,
        isRunning: true,
        linkName: "Nová hra."

      }  
    case 'SET_STOP_GAME':
    return { 
      ...state,
      isRunning: false,
      linkName: "Hraj znova"
    } 
    case 'SET_LEVEL_AND_STYLING_AND_IMGCOUNT':
        
    const levelChanges = {/*--------------------------------------------using dynamic object properties*/
      easy:  ["black","white"],
      medium:["white", "#4d141d"],
      hard:  ["white","black"]
    }

      return {
        ...state,
        level: action.payload.level,
        colorText:levelChanges[action.payload.level][0],
        colorBG:levelChanges[action.payload.level][1],
        imgCount:action.payload.imgCount
      }
    default:
      return state;
  }
}

const defaultState = {
  level:"",
  isRunning:false,
  linkName:"Späť na nastavenia hry.",
  colorText: "black",
  colorBG:"white",
  imgCount:5
}

const AppGame = () =>{

 // ---------------------------useReducer

 const [state,dispatch] = useReducer(reducer, defaultState)

 //----------------------------useState

 let [seconds, setSeconds] = useState(0);

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
        ![5, 6, 7, 8].includes(decryptedSettings.imgCount)){
      
           navigate('/settings'); 
           
           if(["medium", "hard"].includes(decryptedSettings.level)){
             window.location.reload(); //reset color changes (background, ..) 
           }

      }    

          dispatch({type: "SET_LEVEL_AND_STYLING_AND_IMGCOUNT",
                    payload:{
                             level: decryptedSettings.level,
                             imgCount: decryptedSettings.imgCount
                            } })

          document.getElementsByTagName("BODY")[0].setAttribute('style', 'background-color: '+ state.colorBG);

    } catch (error) {
      console.error("Dešifrovanie zlyhalo:", error);
      navigate('/settings'); 

    }
  }else{
    
    navigate('/settings'); 
    // window.location.reload();
   
  }
}, [ settingsData, dispatch, navigate, state.colorBG]); 

  return (
    <>
         <div className="welcome">
         
            <a href="/settings" className="end-game-btn" > {state.linkName} </a>
                      
            <h3 style={{color: state.colorText}}> Pre začatie hry slačte tlačítko štart  </h3> 

            <TimeAndStart
                       seconds={seconds} 
                       setSeconds={setSeconds}
                       dispatch={dispatch}
                       colorText={state.colorText}
                       isRunning={state.isRunning}
                       /> 
         </div>
        
         <div className="column_content" id="content">
                <GameDivPictures level={state.level} seconds={seconds} 
                                 colorText={state.colorText} dispatch={dispatch}
                                 selectedImgCount={ state.imgCount} 
                                /> 
         </div>

    </>
  );
}

export default AppGame;
