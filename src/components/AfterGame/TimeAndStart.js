import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({level,shuffle,seconds,setSeconds, intervalSecondRef,color/*, dispatch*/}) => {
      
    function _incrementSeconds(){/*---------------------------------------------------partial f. for change seconds number by increment +1*/
      // setSeconds(seconds=seconds+1);
      setSeconds(prevSeconds => prevSeconds + 1);
  }
  
    function timer(){/*---------------------------------------------------------------button start */
     
      _stylingAfterStart();
  
      // increment seconds + in hardest level shuffle img´s
      intervalSecondRef.current=setInterval(_incrementSeconds, 1000);

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