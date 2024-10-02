import { DivPicture } from './DivPicture.js';
import { useReducer, useEffect, useCallback } from "react";


import { _fmtMSS } from "./../../_inc/_inc_functions";
import { _shuffleArray } from '../../_inc/_inc_functions.js';
import { divItems } from '../../_inc/data.js'; /*------------------------------------------------data -> source of names of pictures and array of objects from these names  */

const reducerImg = (stateImg, action) => {
  switch (action.type) {
    case 'SHOW_ONE':
    //       if(element.classList.contains('mask')&& divObject.selected!==true&& (selectedArr.length===0||selectedArr.length===1)){/*-------------if divImg is not selected + prevent 3 imgs show*/

    //    let filteredArr=stateImg.divImgs.map(oneDiv => {
    //       if (oneDiv.id === action.payload.id) {
  
    //         return { ...oneDiv, selected: true, classNames: [
    //           ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
    //         ] }
    //       } else {
    //         return oneDiv; //--------------------------------------------------return untouched object
    //       }
    //     });
    //   }
      
      return { 
        ...stateImg,
        divImgs: action.payload
      } 
    case 'UN_MATCH':
      let afterUnMatchArr = stateImg.divImgs.map(oneDiv => {
        if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
          return { ...oneDiv, selected: false, classNames: [
            ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "mask" // remove "selected" and add "mask" class
          ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
        } else {
          return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
        }
      });

      // if(action.payload==="harder"||action.payload==="hardest"){
      if(action.payload==="harder"){

         _shuffleArray(afterUnMatchArr)
      }
      return { 
        // ...stateImg,
        divImgs: afterUnMatchArr

      }
      case 'MATCH':
        let afterMatchArr = stateImg.divImgs.map(oneDiv => {
          if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
            return { ...oneDiv, classNames: [
              ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center" /* remove selected and add rotate */
              // ...oneDiv.classNames, "rotate-center" /* remove selected and add rotate */
            ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
          } else {
            return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
          }
        });

        // let afterAfterMatchArr = afterMatchArr.filter(oneDiv => oneDiv.selected !== true);
        return { 
          ...stateImg,
          divImgs: afterMatchArr
        }
        case 'SET_START_GAME':
          return { 
            ...stateImg,
            isRunning: true
          }  
    case 'REMOVE_AFTER_MATCH':
      // let afterAfterMatchArr = stateImg.divImgs.filter(oneDiv => oneDiv.selected !== true);
      
      let afterAfterMatchArr = stateImg.divImgs.filter(oneDiv => !oneDiv.classNames.includes("rotate-center"));

      return { 
        divImgs: afterAfterMatchArr
      }  
    default:
      return stateImg;
  }
}

const defaultStateImg = {
  divImgs:divItems,
}

// export const GameDivPictures = ({level,seconds, intervalSecondRef,dispatch}) =>{
  export const GameDivPictures = (props) =>{
const {intervalSecondRef,dispatch} =props
  // ---------------------------useReducer

 const [stateImg,dispatchImg] = useReducer(reducerImg, defaultStateImg)

//  let [divImgs, setGameDivImgs] = useState(divItems);

 // ---------------------------
 // ---------------------------timing fn´s
 // ---------------------------

 let stopTimer= useCallback(() => { /*----------------------------------------------------------stop seconds increment */
  clearInterval(intervalSecondRef.current);

  dispatch({type: "SET_STOP_GAME" })

  document.getElementById("seconds").style.display="none";
// }, [props.intervalSecondRef, props.dispatch]); // dependencies
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
   
    let selectedArr = stateImg.divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
    let rotateddArr = stateImg.divImgs.filter(oneDiv => oneDiv.classNames.includes("rotate-center"));


    if(element.classList.contains('mask')&& divObject.selected!==true&& (selectedArr.length===0||selectedArr.length===1)&&(rotateddArr.length===0)){/*-------------if divImg is not selected + prevent 3 imgs show*/
     
      let filteredArr=stateImg.divImgs.map(oneDiv => {
        if (oneDiv.id === divObject.id) {

          return { ...oneDiv, selected: true, classNames: [
            ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
          ] }
        } else {
          return oneDiv; //--------------------------------------------------return untouched object
        }
      });
    // });
       dispatchImg({type: "SHOW_ONE", payload: filteredArr })

    // setGameDivImgs(selectedArr)/*-----------------------------------------set changed array */
    }
  }

 // useEffect(() => {}, [divImgs]); /*re-render to update value of divImgs after setstate(usestate) */
  
  useEffect(() => {
    
    setTimeout(function(){

          let selectedArr
          // let iterationCount = 0
          // const maxIterations = 10000
          
          // do{
            // let selectedArr = divImgs.filter(oneDiv => oneDiv.selected === true);
            selectedArr = stateImg.divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
          //   iterationCount++
          //   if (iterationCount > maxIterations) {/*------------------------------------prevent freezing browser and game */
          //     console.warn("it is a never ending loop ")
          //     break;
          //   }
          // }while(selectedArr.length!==2)


            if (selectedArr.length===2){
              //  document.body.style.pointerEvents = "none"//;---------------------------prevent to show third image 
              if (selectedArr[0].imgPath=== selectedArr[1].imgPath){/* if match */
                            // setTimeout(() => {

                dispatchImg({type: "MATCH" })
                                // }, 200);

                // let afterMatchArr = state.divImgs.map(oneDiv => {
                //   if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
                //     return { ...oneDiv, classNames: [
                //       ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "rotate-center" /* remove selected and add rotate */
                //     ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
                //   } else {
                //     return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
                //   }
                // });
            
                // setGameDivImgs(afterMatchArr)
                  void document.body.offsetHeight; // ------------------------------------ reflow -> help from chat GPT to support animation 

                setTimeout(() => {
              // /////////////////let afterAfterMatchArr = afterMatchArr.filter(oneDiv => !oneDiv.selected);
                  // let afterAfterMatchArr = afterMatchArr.filter(oneDiv => oneDiv.selected !== true);
                  // setGameDivImgs(afterAfterMatchArr);
                  dispatchImg({type: "REMOVE_AFTER_MATCH" })
                  // document.body.style.pointerEvents = "auto"//;---------------------------prevent to show third image 

                }, 200);
                      
              // setGameDivImgs(afterAfterMatchArr)

              }else {/* ---------------------------------------------------------------if unmatch */
                // let selectedArr = state.divImgs.map(oneDiv => {
                //   if ((oneDiv.selected === true)&& (oneDiv.classNames.includes("selected_Div_img"))) {
                //     return { ...oneDiv, selected: false, classNames: [
                //       ...oneDiv.classNames.filter(className => className !== "selected_Div_img"), "mask" // remove "selected" and add "mask" class
                //     ] }/*-------------------------------------------------------------change 2 selected img´s to nonselected and hide */
                //   } else {
                //     return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
                //   }
                // });

                // if(level==="harder")
                //   {_shuffleArray(selectedArr)}

                // setGameDivImgs(selectedArr)  
                dispatchImg({type: "UN_MATCH",payload:props.level })
           
              }
            }

            // setGameDivImgs(afterMatchArr)
            // }
            document.body.style.pointerEvents = "auto";/*-------------------------------------------give back functionality to pointer*/
      checkEnd() /* checking whether all images are out -> so that´s end of the game  */

    }, 200);
      // }, 210);
      // checkEnd() /* checking whether all images are out -> so that´s end of the game  */

  }, [stateImg.divImgs,checkEnd,props.level])

  return (
     <div className="row" id="row">

        {stateImg.divImgs.map((oneDiv) => (      //array of img names -> div>img

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
  
 