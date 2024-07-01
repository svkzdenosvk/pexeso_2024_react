// import SetLevel from './SetLevel';
import { Game } from "./components/AfterGame/Game";
import {SetLevelBtns} from "./components/BeforeGame/SetLevelBtns";


const App = () =>{
  return (
    <>
      
         {/* <TimeAndStart level={level} 
                       shuffle={shuffle} 
                       seconds={seconds} 
                       setSeconds={setSeconds} 
                       setIntervalSecond={setIntervalSecond}
                       color={color}/>  */}
         <div className="welcome">
            <h1> {/*style={{color}}   {h1Context} */}Pexeso </h1>
          
            <h3>Vitajte v hre pexeso, pre začatie hry zvoľte náročnosť nižšie </h3>

            <div id="levelBtns" /*style={{display}}*/ >
              <SetLevelBtns /*my_setLevel={my_setLevel}*//>
            </div>

         </div>
      

       

      <div className="column_content" id="content">
        <Game /*level={level} shuffle={shuffle} seconds={seconds} intervalSecond={intervalSecond}*//> 
      </div>
    </>
    
  );
}

export default App;
