import { useEffect } from 'react';
import { _stylingAfterStart } from '../../_inc/_inc_functions';
 
export const TimeAndStart = ({seconds,colorText,isRunning,dispatch,setSeconds}) => {
    
    useEffect(() => {
      if (!isRunning) return;

      function _incrementSeconds() {

        setSeconds(prevseconds => prevseconds + 1);

      }
      
      const secondInterval = setInterval(_incrementSeconds, 1000);/* -------set interval to increase seconds*/


      return () => {//----------------------------------------------------- cleaning the interval when unmounting or changing dependencies

        clearInterval(secondInterval);
      };
    }, [isRunning,setSeconds]);
   

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
  