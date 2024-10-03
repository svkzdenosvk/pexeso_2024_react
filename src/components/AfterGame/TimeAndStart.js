import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({level,shuffle,seconds,/*setSeconds,*/intervalSecondRef,color,isRunning,dispatch}) => {
    
    useEffect(() => {
      if (!isRunning) return;

      function _incrementSeconds() {
        // setSeconds(seconds => seconds + 1);
        dispatch({type: "SET_SECONDS" })

      }
      // set interval to increase seconds
      // const secondInterval = setInterval(_incrementSeconds, 1000);
      // setIntervalSecond(secondInterval);
      intervalSecondRef.current=setInterval(_incrementSeconds, 1000);

      // Cleaning the interval when unmounting or changing dependencies
      // return () => {
      //   clearInterval(secondInterval);
      // };
    }, [isRunning, intervalSecondRef,dispatch]);
   

    function timer(){/*---------------------------------------------------------------button start */
     
      _stylingAfterStart();

      dispatch({type: "SET_START_GAME" })

      // in hardest level shuffle img´s
      // if(level==="hardest"){/*---------------------------------------------------------working only in hardest version *//*maybe this can by removed from timer();*/
      //    setInterval(shuffle, 800);
      // }
    }
    
    return (
      <div id="timeAndStart">
          <div style={{color}} id="seconds"  >{seconds} s</div>
          <div onClick={() => {timer()}} id="start" >START</div>
      </div>
    )
  }