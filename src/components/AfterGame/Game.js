import { DivPicture } from './DivPicture.js';

export const Game = () =>{
    const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
    const doubleImgs= [...arrImg, ...arrImg];

      //array of components -> div>img
      const divItems = doubleImgs.map((pictureName,index) =>

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