import { DivPicture } from './DivPicture.js';

export const Game = () =>{
    const arr= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
    const fullArr= [...arr, ...arr];

      //array of components -> div>img
      const divItems = fullArr.map((pictureName,index) =>

        <DivPicture key={index} 
                    pictureName={pictureName} 
                    /*stticSource={stticSource} 
                    level={level} 
                    shuffle={shuffle} 
                    setStticSource={setStticSource}
                    seconds={seconds}
                    intervalSecond={intervalSecond} *//>
     );

    return (
        <div className="row" id="row">

             {divItems}

        </div> 
    );
  }
  
  //export default Game;