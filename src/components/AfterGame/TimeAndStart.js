import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({level,shuffle,seconds,setSeconds,setIntervalSecond,color}) => {
  
    const secondsEl= document.getElementById("seconds");
    
  
    function _incrementSeconds(){/*---------------------------------------------------partial f. for change seconds number by increment +1*/
      setSeconds(seconds=seconds+1);
      // secondsEl.innerHTML  = seconds + " s";
        secondsEl.textContent  = seconds + " s"; /*-----------------------------------with textContent it´s more secure than with innerHTML*/ 
    }
  
    function timer(){/*---------------------------------------------------------------button start */
     
        _stylingAfterStart();

        //to shuffle before every game (doesn´t matter level)
        if(seconds===0){
          shuffle();
        }
  
      // increment seconds + in hardest level shuffle img´s
      setIntervalSecond(setInterval(_incrementSeconds, 1000));
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