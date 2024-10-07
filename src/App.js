import { useState, useRef, useReducer } from "react";

import { _stylingAfterLevel,_shuffleArray } from "./_inc/_inc_functions";

import { GameDivPictures } from "./components/AfterGame/GameDivPictures";
import {SetLevelBtns} from "./components/BeforeGame/SetLevelBtns";
import {TimeAndStart} from "./components/AfterGame/TimeAndStart"

import { divItems } from './_inc/data.js'; /*------------------------------------------------data -> source of names of pictures and array of objects from these names  */

const reducer = (state, action) => {
  switch (action.type) {
   
    case 'SET_START_GAME':
      return { 
        ...state,
        isRunning: true
      }  
    case 'SET_STOP_GAME':
    return { 
      ...state,
      isRunning: false
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
    /*------------------------------------------cases about managing imgs */  
    case 'HARDEST_LEVEL_SHUFFLE':
      _shuffleArray(state.divImgs)

      return { 
        ...state,
        divImgs: state.divImgs
      } 
    case 'SHOW_ONE':
      let filteredArr=state.divImgs.map(oneDiv => {
          if (oneDiv.id === action.payload.id) {
  
            return { ...oneDiv, selected: true, classNames: [
              ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
            ] }
          } else {
            return oneDiv; //--------------------------------------------------return untouched object
          }
        });
      
      return { 
        ...state,
        divImgs: filteredArr
      } 
    case 'UN_MATCH':
      let afterUnMatchArr = state.divImgs.map(oneDiv => {
        if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
          return { ...oneDiv, selected: false, classNames: [
            ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "mask" // remove "selected" and add "mask" class
          ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
        } else {
          return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
        }
      });

      if(action.payload==="harder"/*||action.payload==="hardest"*/){

         _shuffleArray(afterUnMatchArr)
      }
      return { 
        ...state,
        divImgs: afterUnMatchArr
      }
    case 'MATCH':
        let afterMatchArr = state.divImgs.map(oneDiv => {
          if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center" /* remove selected and add rotate */
            ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
          } else {
            return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
          }
        });

        // let afterAfterMatchArr = afterMatchArr.filter(oneDiv => oneDiv.selected !== true);
      return { 
        ...state,
        divImgs: afterMatchArr
      }
    
    case 'REMOVE_AFTER_MATCH':
     
      let afterAfterMatchArr = state.divImgs.filter(oneDiv => !oneDiv.classNames.includes("rotate-center"));

      return { 
        ...state,
        divImgs: afterAfterMatchArr
      } 
    default:
      return state;
  }
}

const defaultState = {
  level:"",
  color:"black",
  isRunning:false,
  divImgs:divItems,
}

const App = () =>{
  
 // ---------------------------useState
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
          
            <h3 style={{color: state.color}}>Vitajte v hre pexeso, pre začatie hry zvoľte náročnosť nižšie </h3>

            <div id="levelBtns"  >
              <SetLevelBtns my_setLevel={my_setLevel}/>
            </div>

            <TimeAndStart 
                          seconds={seconds} 
                          setSeconds={setSeconds}
                          dispatch={dispatch}
                          intervalSecondRef={intervalSecondRef}
                          color={state.color}
                          isRunning={state.isRunning}
                          /> 
         </div>
        
         <div className="column_content" id="content">
                <GameDivPictures divImgs={state.divImgs} level={state.level} seconds={seconds} intervalSecondRef={intervalSecondRef} setIsRunning={state.setIsRunning} dispatch={dispatch}/> 
         </div>
    </>
  );
}

export default App;
