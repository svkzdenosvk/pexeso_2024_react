import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({seconds,intervalSecondRef,color,isRunning,dispatch}) => {
    
    useEffect(() => {
      if (!isRunning) return;

      function _incrementSeconds() {
        dispatch({type: "SET_SECONDS" })

      }
      // set interval to increase seconds
      intervalSecondRef.current=setInterval(_incrementSeconds, 1000);

      // Cleaning the interval when unmounting or changing dependencies
      // return () => {
      //   clearInterval(intervalSecondRef.current);
      // };
    }, [isRunning, intervalSecondRef,dispatch]);
   

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