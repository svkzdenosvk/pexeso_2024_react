import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({seconds,setSeconds,intervalSecondRef,color,isRunning,dispatch}) => {
    
    useEffect(() => {
      if (!isRunning) return;

      function _incrementSeconds() {
        setSeconds(prevseconds => prevseconds + 1);
      }
      // set interval to increase seconds
      intervalSecondRef.current=setInterval(_incrementSeconds, 1000);

      // Cleaning the interval when unmounting or changing dependencies
      // return () => {
      //   clearInterval(intervalSecondRef.current);
      // };
    }, [isRunning,setSeconds,intervalSecondRef,dispatch]);
   
    function timer(){/*---------------------------------------------------------------button start */
     
      _stylingAfterStart();

      dispatch({type: "SET_START_GAME" })

    }
    
    return (
      <div id="timeAndStart">
          <div style={{color}} id="seconds"  >{seconds} s</div>
          <div onClick={() => {timer()}} id="start" >START</div>
      </div>
    )
  }