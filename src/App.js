import { useState } from "react";

import { _stylingAfterLevel } from "./_inc/_inc_functions";

import { Game } from "./components/AfterGame/Game";
import {SetLevelBtns} from "./components/BeforeGame/SetLevelBtns";
import {TimeAndStart} from "./components/AfterGame/TimeAndStart"

const App = () =>{

 // ---------------------------
 // ---------------------------useStates
 // ---------------------------

  const [level, setLevel] = useState();
  const [color, setColor] = useState("");
 // const [display, setDisplay] = useState("");
  const [h1Context, setH1context] = useState( "Pexeso");

  let [seconds, setSeconds] = useState(0);
  let [intervalSecond, setIntervalSecond] = useState(0);

  // ---------------------------
 // ---------------------------set level fn´s
 // ---------------------------

  function _setLevelChanges(colorText,colorBG,) { /*--------------------------------- partial function for set level of the game (it´s also about change styles)*/
    
    //style -> color of H1, H3 and seconds
    setColor(colorText);
    
    _stylingAfterLevel(colorBG);
     
  }
 
  function my_setLevel(e,leveliD ) {/*-----------------------------------------------------main f. for set level*/
    
    setLevel(leveliD)
  
      switch (e.target.id) {
      
        case "harder":
          _setLevelChanges("white", "#4d141d");
          break;
        case "hardest":
          _setLevelChanges("white", "black");
          break;
        case "normal":        
          _setLevelChanges("black");
          break;
        default:
          break;      
      }
  }

  return (
    <>
         <div className="welcome">
            <h1 style={{color}}> {h1Context} </h1>
          
            <h3 style={{color}}>Vitajte v hre pexeso, pre začatie hry zvoľte náročnosť nižšie </h3>

            <div id="levelBtns"  >
              <SetLevelBtns my_setLevel={my_setLevel}/>
            </div>

            <TimeAndStart level={level} 
                      //  shuffle={shuffle} 
                       seconds={seconds} 
                       setSeconds={setSeconds} 
                       setIntervalSecond={setIntervalSecond}
                       color={color}/> 
         </div>

        
        
         <div className="column_content" id="content">
            <Game /*level={level} shuffle={shuffle} seconds={seconds} intervalSecond={intervalSecond}*//> 
         </div>
    </>
    
  );
}

export default App;
