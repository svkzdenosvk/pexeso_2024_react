// import SetLevel from './SetLevel';
import { Game } from "./components/AfterGame/Game";
import {SetLevelBtns} from "./components/BeforeGame/SetLevelBtns";


const App = () =>{
  return (
    <div className="App" >
      <div>
         {/* <TimeAndStart level={level} 
                       shuffle={shuffle} 
                       seconds={seconds} 
                       setSeconds={setSeconds} 
                       setIntervalSecond={setIntervalSecond}
                       color={color}/>  */}
      
        <div id="levelBtns" /*style={{display}}*/ >
            <SetLevelBtns /*my_setLevel={my_setLevel}*//>
        </div>
      </div>

        <h1> {/*style={{color}}  
        {h1Context} */}
      </h1>

      <div className="column_content" id="content">
        <Game /*level={level} shuffle={shuffle} seconds={seconds} intervalSecond={intervalSecond}*//> 
      </div>
    </div>
    
  );
}

export default App;
