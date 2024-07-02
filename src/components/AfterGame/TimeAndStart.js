
export const TimeAndStart = ({level,/*shuffle,*/seconds,setSeconds,setIntervalSecond,color}) => {

    //this component is about start btn and seconds
  
    const start =document.getElementById("start");
    const secondsEl= document.getElementById("seconds");
    
  
    function _incrementSeconds(){/*---------------------------------------------------partial f. for change seconds number by increment +1*/
      setSeconds(seconds=seconds+1);
      secondsEl.innerHTML  = seconds + " s";
    }
  
    function timer(){/*---------------------------------------------------------------button start */
     
      //to hide start button 
      start.style.display="none";
      document.getElementsByTagName("H3")[0].setAttribute('style', 'display: none'); 
      
      //style H1
      document.getElementsByClassName("welcome")[0].setAttribute('style', 'margin-top: 150px');

      //styling all react app id result
      document.getElementById("result").setAttribute('style', 'flex-direction: column'); 

      // to see images
      document.getElementsByClassName("column_content")[0].style.display="flex";
  
      // increment seconds + in hardest level shuffle img´s
      setIntervalSecond(setInterval(_incrementSeconds, 1000));
      if(level==="hardest"){/*---------------------------------------------------------working only in hardest version *//*maybe this can by removed from timer();*/
         //setInterval(shuffle, 800);
         console.log("you are in hardest level")
     }
  }
  
    return (
      <div id="timeAndStart">
          <div style={{color}} id="seconds"  >{seconds} s</div>
          <div onClick={() => {timer()}} id="start" >START</div>
      </div>
    )
  }