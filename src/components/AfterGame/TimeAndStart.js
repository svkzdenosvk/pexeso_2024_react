import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({level,shuffle,seconds,setSeconds,setIntervalSecond,color,isRunning, setIsRunning}) => {
    
    useEffect(() => {
      if (!isRunning) return;

      function _incrementSeconds() {
        setSeconds(seconds => seconds + 1);
      }
      // set interval to increase seconds
      const secondInterval = setInterval(_incrementSeconds, 1000);
      setIntervalSecond(secondInterval);
    
      // Cleaning the interval when unmounting or changing dependencies
      // return () => {
      //   clearInterval(secondInterval);
      // };
    }, [isRunning, setSeconds, setIntervalSecond]);
   

    function timer(){/*---------------------------------------------------------------button start */
     
      _stylingAfterStart();

      setIsRunning(true);

      // in hardest level shuffle img´s
      if(level==="hardest"){/*---------------------------------------------------------working only in hardest version *//*maybe this can by removed from timer();*/
         setInterval(shuffle, 800);
      }
    }
    
    return (
      <div id="timeAndStart">
          <div style={{color}} id="seconds"  >{seconds} s</div>
          <div onClick={() => {timer()}} id="start" >START</div>
      </div>
    )
  }