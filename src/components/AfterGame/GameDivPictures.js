import { DivPicture } from './DivPicture.js';
import { useState, useEffect,useCallback } from "react";


import { _fmtMSS } from "./../../_inc/_inc_functions";
import {_shuffleArray }from '../../_inc/_inc_functions.js'

const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
const doubleImgs= [...arrImg, ...arrImg];

//to shuffle before every game
_shuffleArray(doubleImgs)

//generate UUID random keys
const uuid = require('uuid')

//creation of 2-dimensional array: - out of component to make id´s stable
// ['123e4567-e89b-12d3-a456-426614174000', 'lightning'],
// ['123e4567-e89b-12d3-a456-426614174001', 'drop'],..
const imgsWithKeys = doubleImgs.map(pictureName => [uuid.v4(), pictureName]);

//array of img names -> div>img
let divItems = imgsWithKeys.map(([id, pictureName]) =>(
  { id: id, imgPath: pictureName, classNames:["mask"] } 
))

export const GameDivPictures = (props) =>{
 let {level,seconds, intervalSecond, setIsRunning} = props

//  const [stticSource, setStticSource] = useState("");

 let [divImgs, setGameDivImgs] = useState(divItems);

 // ---------------------------
 // ---------------------------timing fn´s
 // ---------------------------

 let stopTimer= useCallback(() => { /*----------------------------------------------------------stop seconds increment */
  clearInterval(intervalSecond);
  setIsRunning(false);
  document.getElementById("seconds").style.display="none";
}, [intervalSecond,setIsRunning]); // pridaj ako závislosť


// ---------------------------
// ---------------------------ending fn
// ---------------------------

const checkEnd = useCallback(() => {  
//  checkEnd(){/*------------------------------------------------------------check if is end == each picture removed */
        if(!document.getElementById("row").firstElementChild){/*--------------------if all images on page are removed */

            stopTimer();/*----------------------------------------------------------stop increment seconds */
            let endTime=_fmtMSS(seconds);/*-----------------------------------formating time */

            document.getElementsByTagName("BODY")[0].firstElementChild.classList.add('div_center');/*---------------start ---animation of gratulation text */
            let timeArr=endTime.split(":");/*---------------------------------------split time string (seconds:minutes) to array for separate minutes and second in gratulation text */

            document.getElementsByTagName("H1")[0].innerHTML = "Gratulácia, vyhrali ste za "+(timeArr[0]==="0"?"":timeArr[0]+"m")+" "+ timeArr[1]+"s";
            document.getElementsByTagName("H1")[0].classList.add('h1End');/*---------end ---animation of gratulation text */
        }
      }, [seconds,stopTimer]); // adding dependencies


  // ---------------------------
  // ---------------------------fn´s to show div>imgs
  // ---------------------------

  function showImg(element,divObject){
  // _myToggle(element,'mask','selected_Div_img');
    
    // let selectedArr = divImgs.map(oneDiv => {
    //    if (oneDiv === divObject) {
    //  //if (oneDiv.id === divObject.id) {

    //       return { ...oneDiv, selected: true }; /*------------------------------------------set selected atribute on clicked img (divImg) */
    //    } else {
    //       return oneDiv;/*------------------------------------------------------------------return without change unclicked img (divImg)*/
    //    }
    // });

    setGameDivImgs(prevArr => {
      return prevArr.map(oneDiv => {
        if (oneDiv.id === divObject.id) {
          // return { ...oneDiv, selected: true }; // set selected on clicked Div -img
          return { ...oneDiv, selected: true, classNames: [
            ...oneDiv.classNames.filter(className => className !== "mask"), "selected_Div_img" // remove 'mask' and add "selected" class
          ] }
        } else {
          return oneDiv; //return untouched object
        }
      });
    });

    // setGameDivImgs(selectedArr)/*-----------------------------------------------------------set changed array */
  
  }

  // function settingAfterComparison(){
  //   document.body.style.pointerEvents = "auto";/*-------------------------------------------give back functionality to pointer*/
  //   // setStticSource("");/*-------------------------------------------------------------------clear comparable variable */
  // }

  // ---------------------------
  // ---------------------------main fn to compare
  // ---------------------------

  function mainFn(element, divObject) {/*---------------------------------------------the most main function to manage pexeso-code */
  
    if(element.classList.contains('mask')&& divObject.selected!==true){/*-------------if on image is joker´s image */

      // let imgElm = element.firstElementChild;

      showImg(element,divObject);/*----------------------------------------------------remove joker image and show img under */
      
      // if(stticSource===""){/*----------------------------------------------------------if no image is shown, get attribute from clicked*/
        
        // setStticSource(imgElm.getAttribute("src"));
      // }else{/*-------------------------------------------------------------------------compare sources attribute of showed and clicked */
        //  document.body.style.pointerEvents = "none";/*-----------!!toto mozno sa odkomentuje!!---------------------prevent to show third image */

          // if(stticSource===imgElm.getAttribute("src")){/*------------------------------if matched --> remove images */
                                                                                                              
          // }else{/*---------------------------------------------------------------------if NOT the same src-path --> hide images below joker img */
    
          // }
      // }
    }
  }

  // useEffect(() => console.log("re-render because x changed:", divImgs), [divImgs])

  useEffect(() => {}, [divImgs]); /*re-render to update value of divImgs after setstate(usestate) */
  

  useEffect(() => {
    
    setTimeout(function(){

    // let selectedArr = divImgs.filter(oneDiv => oneDiv.selected === true);
    let selectedArr = divImgs.filter(oneDiv => oneDiv.classNames.includes("selected_Div_img"));
    
            if (selectedArr.length===2){
              document.body.style.pointerEvents = "none";/*---------------------------prevent to show third image */
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
              // checkEnd()
                      
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
            // settingAfterComparison()
            document.body.style.pointerEvents = "auto";/*-------------------------------------------give back functionality to pointer*/

    }, 250);
      // }, 210);
      checkEnd() /* checking whether all images are out -> so that´s end of the game  */

      // settingAfterComparison()
  }, [divImgs,checkEnd,level])

  return (
     <div className="row" id="row">

        {divImgs.map((oneDiv) => (      //array of img names -> div>img

          <DivPicture
            key={oneDiv.id} // unique key for each div
            sendingFunction={mainFn}
            pictureName={oneDiv.imgPath} // name of image
            classNames={oneDiv.classNames}
            object={oneDiv}
          />
        ))}
     </div>
  );
}
  
 