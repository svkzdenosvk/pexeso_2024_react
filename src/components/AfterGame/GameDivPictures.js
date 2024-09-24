import { DivPicture } from './DivPicture.js';
import { useState, useEffect, useCallback } from "react";


import { _fmtMSS } from "./../../_inc/_inc_functions";
import { _shuffleArray } from '../../_inc/_inc_functions.js';
import { divItems } from '../../_inc/data.js'; /*------------------------------------------------data -> source of names of pictures and array of objects from these names  */

export const GameDivPictures = ({level,seconds, intervalSecondRef,dispatch}) =>{

 let [divImgs, setGameDivImgs] = useState(divItems);

 // ---------------------------
 // ---------------------------timing fn´s
 // ---------------------------

 let stopTimer= useCallback(() => { /*----------------------------------------------------------stop seconds increment */
  clearInterval(intervalSecondRef.current);

  dispatch({type: "SET_STOP_GAME" })

  document.getElementById("seconds").style.display="none";
}, [intervalSecondRef,dispatch]); // dependencies

// ---------------------------
// ---------------------------ending fn
// ---------------------------

const checkEnd = useCallback(() => { /*--------------------------------------check if is end == each picture removed */
        if(!document.getElementById("row").firstElementChild){/*-------------if all images on page are removed */
            stopTimer();/*---------------------------------------------------stop increment seconds */
            let endTime=_fmtMSS(seconds);/*----------------------------------formating time */

            document.getElementsByTagName("BODY")[0].firstElementChild.classList.add('div_center');/*---------------start ---animation of gratulation text */
            let timeArr=endTime.split(":");/*--------------------------------split time string (seconds:minutes) to array for separate minutes and second in gratulation text */

            document.getElementsByTagName("H1")[0].innerHTML = "Gratulácia, vyhrali ste za "+(timeArr[0]==="0"?"":timeArr[0]+"m")+" "+ timeArr[1]+"s";
            document.getElementsByTagName("H1")[0].classList.add('h1End');/*-end ---animation of gratulation text */
        }
      }, [seconds,stopTimer]); // adding dependencies

  // ---------------------------
  // ---------------------------fn´s to show div>imgs
  // ---------------------------

  function showImg(element,divObject){
   
    let selectedArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));

    if(element.classList.contains('mask')&& divObject.selected!==true&& (selectedArr.length===0||selectedArr.length===1)){/*-------------if divImg is not selected + prevent 3 imgs show*/

    setGameDivImgs(prevArr => { /*-------------------------------------------maybe this way it should update DivImgs quicker */
      return prevArr.map(oneDiv => {
        if (oneDiv.id === divObject.id) {

          return { ...oneDiv, selected: true, classNames: [
            ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
          ] }
        } else {
          return oneDiv; //--------------------------------------------------return untouched object
        }
      });
    });

    // setGameDivImgs(selectedArr)/*-----------------------------------------set changed array */
    }
  }

 // useEffect(() => {}, [divImgs]); /*re-render to update value of divImgs after setstate(usestate) */
  
  useEffect(() => {
    
    setTimeout(function(){

    // let selectedArr = divImgs.filter(oneDiv => oneDiv.selected === true);
    let selectedArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
    
            if (selectedArr.length===2){
              /* document.body.style.pointerEvents = "none";---------------------------prevent to show third image */
              if (selectedArr[0].imgPath=== selectedArr[1].imgPath){/* if match */
            
                let afterMatchArr = divImgs.map(oneDiv => {
                  if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
                    return { ...oneDiv, classNames: [
                      ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center" /* remove selected and add rotate */
                    ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
                  } else {
                    return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
                  }
                });
            
                setGameDivImgs(afterMatchArr)
                void document.body.offsetHeight; // ------------------------------------ reflow -> help from chat GPT to support animation 

                setTimeout(() => {
              // let afterAfterMatchArr = afterMatchArr.filter(oneDiv => !oneDiv.selected);
                  let afterAfterMatchArr = afterMatchArr.filter(oneDiv => oneDiv.selected !== true);
                  setGameDivImgs(afterAfterMatchArr);
                }, 200);
                      
              // setGameDivImgs(afterAfterMatchArr)

              }else {/* ---------------------------------------------------------------if unmatch */
                let selectedArr = divImgs.map(oneDiv => {
                  if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
                    return { ...oneDiv, selected: false, classNames: [
                      ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "mask" // remove "selected" and add "mask" class
                    ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
                  } else {
                    return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
                  }
                });

                if(level==="harder")
                  {_shuffleArray(selectedArr)}

                setGameDivImgs(selectedArr)             
              }
            }

            // setGameDivImgs(afterMatchArr)
            // }
            document.body.style.pointerEvents = "auto";/*-------------------------------------------give back functionality to pointer*/
      checkEnd() /* checking whether all images are out -> so that´s end of the game  */

    }, 250);
      // }, 210);
      // checkEnd() /* checking whether all images are out -> so that´s end of the game  */

  }, [divImgs,checkEnd,level])

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
  
 