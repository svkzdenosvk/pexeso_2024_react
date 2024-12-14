import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({seconds,colorText,isRunning,dispatch,setSeconds}) => {
    
    useEffect(() => {

      if (!isRunning) return;

      const startTime = Date.now();
      const interval = setInterval(() => {
        setSeconds(Math.floor((Date.now() - startTime) / 1000));// ---------more accurate second counter (advice from chatGPT)
      }, 1000);
  
      return () => clearInterval(interval);
    }

    , [isRunning,setSeconds]);
   

    function timer(){/*------------------------------------------------------button start */
     
      _stylingAfterStart();

      dispatch({type: "SET_START_GAME" })
    }
    
    return (
      <div id="timeAndStart">
          <div style={{color: colorText}} id="seconds"  >{seconds} s</div>

          <div onClick={() => {timer()}} id="start" >START</div>
      </div>
    )
  }
  