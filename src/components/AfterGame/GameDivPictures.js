import { DivPicture } from './DivPicture.js';
import { useEffect, useCallback } from "react";

import { _fmtMSS } from "./../../_inc/_inc_functions";

  export const GameDivPictures = (props) =>{
const {intervalSecondRef,dispatch,divImgs,level} =props
 
 // ---------------------------
 // ---------------------------timing fn´s
 // ---------------------------

 let stopTimer= useCallback(() => { /*----------------------------------------------------------stop seconds increment */
  clearInterval(intervalSecondRef.current);

  dispatch({type: "SET_STOP_GAME" })

  document.getElementById("seconds").style.display="none";
}, [intervalSecondRef, dispatch]); // dependencies

// ---------------------------
// ---------------------------ending fn
// ---------------------------

const checkEnd = useCallback(() => { /*--------------------------------------check if is end == each picture removed */
        if(!document.getElementById("row").firstElementChild){/*-------------if all images on page are removed */
            stopTimer();/*---------------------------------------------------stop increment seconds */
            let endTime=_fmtMSS(props.seconds);/*----------------------------------formating time */

            document.getElementsByTagName("BODY")[0].firstElementChild.classList.add('div_center');/*---------------start ---animation of gratulation text */
            let timeArr=endTime.split(":");/*--------------------------------split time string (seconds:minutes) to array for separate minutes and second in gratulation text */

            document.getElementsByTagName("H1")[0].innerHTML = "Gratulácia, vyhrali ste za "+(timeArr[0]==="0"?"":timeArr[0]+"m")+" "+ timeArr[1]+"s";
            document.getElementsByTagName("H1")[0].classList.add('h1End');/*-end ---animation of gratulation text */
        }
      }, [props.seconds,stopTimer]); // adding dependencies

  // ---------------------------
  // ---------------------------fn´s to show div>imgs
  // ---------------------------

  function showImg(element,divObject){
   
    let selectedArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
    let rotateddArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("rotate-center"));


    if(element.classList.contains('mask')&& divObject.selected!==true&& (selectedArr.length===0||selectedArr.length===1)&&(rotateddArr.length===0)){/*-------------if divImg is not selected + prevent 3 imgs show*/
     
      dispatch({type: "SHOW_ONE", payload: divObject })
    }
  }

 // useEffect(() => {}, [divImgs]); /*re-render to update value of divImgs after setstate(usestate) */
  
  useEffect(() => {
    
    setTimeout(function(){

           let selectedArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
        
            if (selectedArr.length===2){
              //  document.body.style.pointerEvents = "none"//;---------------------------prevent to show third image 
              if (selectedArr[0].imgPath=== selectedArr[1].imgPath){/* if match */
                            
                // setTimeout(() => {
                dispatch({type: "MATCH" })
                // }, 200);

                  void document.body.offsetHeight; // ------------------------------------ reflow -> help from chat GPT to support animation 

                setTimeout(() => {
              
                  dispatch({type: "REMOVE_AFTER_MATCH" })
                  // document.body.style.pointerEvents = "auto"//;---------------------------prevent to show third image 

                }, 200);
                      
              }else {/* ---------------------------------------------------------------if unmatch */
            
                dispatch({type: "UN_MATCH",payload:level })
           
              }
            }

            document.body.style.pointerEvents = "auto";/*-------------------------------------------give back functionality to pointer*/
      checkEnd() /* checking whether all images are out -> so that´s end of the game  */

    }, 200);
      // checkEnd() /* checking whether all images are out -> so that´s end of the game  */

      if (level === "hardest") {
        const intervalShuffleHardest = setInterval(() => {
          dispatch({ type: "HARDEST_LEVEL_SHUFFLE" });
        }, 400);
    
        return () => clearInterval(intervalShuffleHardest);
      }
  }, [divImgs, dispatch, checkEnd, level])

  return (
     <div className="row" id="row">

        {divImgs.map((oneDiv) => (      //array of img names -> div>img

          <DivPicture
            key={oneDiv.id} // unique key for each div
            sendingFunction={showImg}
            pictureName={oneDiv.imgPath} // name of image
            classNames={oneDiv.classNames}
            object={oneDiv}
          />
        ))}
     </div>
  );
}
  
 