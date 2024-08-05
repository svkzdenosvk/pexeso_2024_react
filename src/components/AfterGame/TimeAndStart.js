import { useEffect, useState } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({level,shuffle,seconds,setSeconds,setIntervalSecond,color,isRunning, setIsRunning}) => {

    //const secondsEl= document.getElementById("seconds");
    
  //possible move this func to app with usestate and just send down function _incr (react šetek 40.video)
    // function _incrementSeconds(){/*---------------------------------------------------partial f. for change seconds number by increment +1*/
     // setSeconds(seconds=seconds+1);
      // setSeconds(seconds => seconds + 1);

   //     secondsEl.textContent  = seconds + " s"; /*-----------------------------------with textContent it´s more secure than with innerHTML*/ 
  //  }
      // setIntervalSecond(setInterval(_incrementSeconds, 1000));
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

      //to shuffle before every game (doesn´t matter level)
      if(seconds===0){
        shuffle();
      }
      setIsRunning(true);

      // increment seconds + in hardest level shuffle img´s
    //  setIntervalSecond(setInterval(_incrementSeconds, 1000));
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