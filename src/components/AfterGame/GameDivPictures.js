import { DivPicture } from './DivPicture.js';
// import { useState, useRef } from "react";
import { useState, useRef, useEffect } from "react";


import { _fmtMSS, _myToggle } from "./../../_inc/_inc_functions";
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

let divItems 

//array of img names -> div>img
divItems = imgsWithKeys.map(([id, pictureName]) =>(
  { id: id, imgPath: pictureName }
))

// for (let jeden of divItems) {
//   console.log("zaciatok hry",jeden.selected)
// }

export const GameDivPictures = (props) =>{

 const firstRef = useRef(null);
 const secondRef = useRef(null);

 const [stticSource, setStticSource] = useState("");

 let [divImgs, setGameDivImgs] = useState(divItems);

 // ---------------------------
 // ---------------------------timing fn´s
 // ---------------------------

 function stopTimer(){/*----------------------------------------------------------stop seconds increment */
  clearInterval(props.intervalSecond);
  props.setIsRunning(false);
  document.getElementById("seconds").style.display="none";
}

// ---------------------------
// ---------------------------ending fn
// ---------------------------

function checkEnd(){/*------------------------------------------------------------check if is end == each picture removed */
      if(!document.getElementById("row").firstElementChild){/*--------------------if all images on page are removed */

          stopTimer();/*----------------------------------------------------------stop increment seconds */
          let endTime=_fmtMSS(props.seconds);/*-----------------------------------formating time */

          document.getElementsByTagName("BODY")[0].firstElementChild.classList.add('div_center');/*---------------start ---animation of gratulation text */
          let timeArr=endTime.split(":");/*---------------------------------------split time string (seconds:minutes) to array for separate minutes and second in gratulation text */

          document.getElementsByTagName("H1")[0].innerHTML = "Gratulácia, vyhrali ste za "+(timeArr[0]==="0"?"":timeArr[0]+"m")+" "+ timeArr[1]+"s";
          document.getElementsByTagName("H1")[0].classList.add('h1End');/*---------end ---animation of gratulation text */
      }
}

// ---------------------------
// ---------------------------fn´s to show / hide animate and delete div>imgs
// ---------------------------

function _deleteImg(el,checkEndCallBack){/*-----------------------------------------partial f. to remove the same showed images*/

  // el.remove();
  setTimeout(function(){
    checkEndCallBack();
  }, 50);
}

function _animate(element, deleteImgCallBack,checkEndCallBack){/*-------------------animation to rotate -> then delete div>img*/ 

  element.classList.add("rotate-center");
   setTimeout(function(){/*---------------------------------------------------------rewriten as callback f.*/
     deleteImgCallBack(element,checkEndCallBack);
   }, 210);
}

function animateAndDelete(first, second,settingAfterComparisonCallBack){/*------------------------..-----------------matched img´s animate->delete*/ 
  _animate(first, _deleteImg, checkEnd);

  if(second) {
    _animate(second, _deleteImg, checkEnd);
  } else {
    console.log("bug bol v animate")
      const selectedImgAgain = document.getElementsByClassName("selected_Div_img");
      for (let selectedElement of selectedImgAgain) {

        _animate(selectedElement, _deleteImg, checkEnd);
      }
    }
    setTimeout(function(){/*---------------------------------------------------------rewriten as callback f.*/
      settingAfterComparisonCallBack();
    }, 0);
  // }, 260);
}

function showImg(element,divObject){
  _myToggle(element,'mask','selected_Div_img');
  
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
        return { ...oneDiv, selected: true }; // Nastaví selected: true na nový objekt
      } else {
        return oneDiv; // Vráti nezmenený objekt
      }
    });
  });

  // setGameDivImgs(selectedArr)

  // setGameDivImgs(selectedArr)/*-----------------------------------------------------------set changed array */

  // for (let jeden of divImgs) {
  //   console.log(jeden.selected)
  // }
 
}

function hideUnMatched(first,second,settingAfterComparisonCallBack){/*---------------------------------------------if shown images do not match -> hide them back  */
  _myToggle(first, 'selected_Div_img', 'mask');

  if(second) {
    _myToggle(second, 'selected_Div_img', 'mask');
  } else {
      const selectedImgCol = document.getElementsByClassName("selected_Div_img");
      for (let element of selectedImgCol) {
        _myToggle(element, 'selected_Div_img', 'mask');
      }
  }
  setTimeout(function(){/*---------------------------------------------------------------rewriten as callback f.*/
    settingAfterComparisonCallBack();
  }, 0);
}

function settingAfterComparison(){
  document.body.style.pointerEvents = "auto";/*-------------------------------------------give back functionality to pointer*/
  setStticSource("");/*-------------------------------------------------------------------clear comparable variable */
}

 // ---------------------------
 // ---------------------------main fn to compare
 // ---------------------------

function mainFn(element, divObject) {/*---------------------------------------------the most main function to manage pexeso-code */
 
  if(element.classList.contains('mask')&& divObject.selected!==true){/*-------------if on image is joker´s image */

    // var imgElm = element.firstElementChild;
    let imgElm = element.firstElementChild;

    showImg(element,divObject);/*----------------------------------------------------remove joker image and show img under */
    
    if(stticSource===""){/*----------------------------------------------------------if no image is shown, get attribute from clicked*/
       
       setStticSource(imgElm.getAttribute("src"));
    }else{/*-------------------------------------------------------------------------compare sources attribute of showed and clicked */
        document.body.style.pointerEvents = "none";/*--------------------------------prevent to show third image */

        let selectedImgCol
        let iterationCount = 0
        const maxIterations = 100000
        
        do {
          selectedImgCol= document.getElementsByClassName("selected_Div_img");
          iterationCount++
          if (iterationCount > maxIterations) {/*------------------------------------prevent freezing browser and game */
            console.warn("it is a never ending loop ")
            break;
          }
        } while(selectedImgCol.length!==2)

        firstRef.current = selectedImgCol[0];
        secondRef.current= selectedImgCol[1];

        if(stticSource===imgElm.getAttribute("src")){/*------------------------------if matched --> remove images */
          
//           let selectedArr = divImgs.filter(oneDiv => oneDiv.selected === true);
// // console.log(selectedArr)
//           if (selectedArr.length===2 && selectedArr[0].imgPath=== selectedArr[1].imgPath ) {
//             let afterMatchArr = divImgs.filter(oneDiv => oneDiv.selected !== true);
// // console.log("som tu")
//             setGameDivImgs(afterMatchArr)

            // animateAndDelete(firstRef.current,secondRef.current,settingAfterComparison);

          // } 


          //  let afterMatchArr = divImgs.map(oneDiv => {
          //    if (oneDiv.selected === true) {
          //       return { ...oneDiv, selected: false };/*---------------------------change 2 selected img´s to nonselected and hide */
          //    } else {
          //       return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
          //     }
          //   })
           // setGameDivImgs(afterMatchArr)

              // setTimeout(function(){
                // animateAndDelete(firstRef.current,secondRef.current,settingAfterComparison);
                // for (let jeden of divItems) {
                //   // console.log(jeden._owner.alternate.memoizedState.memoizedState.current.classList)
                //   console.log(jeden)
                // }
              // }, 265);
                                                                                               
        }else{/*---------------------------------------------------------------------if NOT the same src-path --> hide images below joker img */
   
              let selectedArr = divImgs.map(oneDiv => {
                if (oneDiv.selected === true) {
                  return { ...oneDiv, selected: false };/*---------------------------change 2 selected img´s to nonselected and hide */
                } else {
                  return oneDiv;/*---------------------------------------------------if img wasn´t selected -> nothing to change  */
                }
              });
              
              setGameDivImgs(selectedArr)
             
              // for (let jeden of divImgs) {
              //   console.log(jeden)
              // }

              setTimeout(function(){

                hideUnMatched(firstRef.current,secondRef.current,settingAfterComparison);
             
                props.shuffle();/*---------------------------------------------------in harder (and hardest) version ... shuffle after bad trying*/
                
               }, 250);
              // }, 300);

        }
    }
  }
}
useEffect(() => console.log("re-render because x changed:", divImgs), [divImgs])

useEffect(() => {
  //miesto get elemenet selected .. len pridat rotate classu .. a mozno tie classy pridat aj cez komponent 
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  let selectedImgCol= document.getElementsByClassName("selected_Div_img");
  animateAndDelete(selectedImgCol[0],selectedImgCol[1],settingAfterComparison);

  setTimeout(function(){

  let selectedArr = divImgs.filter(oneDiv => oneDiv.selected === true);

//  let selectedImgCol= document.getElementsByClassName("selected_Div_img");
// console.log(selectedArr)
          if (selectedArr.length===2 && selectedArr[0].imgPath=== selectedArr[1].imgPath ) {
            // animateAndDelete(selectedImgCol[0],selectedImgCol[1],settingAfterComparison);
            let afterMatchArr = divImgs.filter(oneDiv => oneDiv.selected !== true);
// console.log("som tu")
            setGameDivImgs(afterMatchArr)
          }
  }, 210);

}, [divImgs,animateAndDelete])


  // useEffect(() => {
      //array of img names -> div>img
    //  
// console.log(Array.isArray(divItems))
//  useEffect(() => {
//   setGameDivImgs(divItems);
//   console.log("bu")
// setGameDivImgs(divItems); // Nastavíme divImgs len raz pri zmene závislostí

    // }, [divItems]); 



    // return (
    //     <div className="row" id="row">

    //          {/* {divRefs} */}
    //          {divItems} 

    //     </div> 
    // );
    // {divItems.map( (oneDiv) =>{
    //     return  <div onClick={(e) => {mainFn(e.target.parentNode)}} className='mask div_on_click' key={oneDiv.id} >
    //         <img  src={"pictures/pexeso/"+ oneDiv.imgPath +".jpg"} alt='Smiley face' />  
    //     </div> 
       
    // })}
    // console.log(divImgs)
    // return <>
    //      {divImgs.map(oneDiv => (

    //   <div
    //     key={oneDiv.id}
    //     onClick={(e) => mainFn(e.target.parentNode,oneDiv)}
    //     className=' mask div_on_click '
        
    //   >
    //     <img
    //       src={"pictures/pexeso/" + oneDiv.imgPath + ".jpg"}
    //       //  src={"pictures/pexeso/sun.jpg"}

    //       alt='Smiley face'
    //     />
    //   </div>
    // ))}
    
    //   </>

      return (
    <>
      {divImgs.map((oneDiv) => (      //array of img names -> div>img

        <DivPicture
          key={oneDiv.id} // Unikátny kľúč pre každý prvok v iterácii
          sendingFunction={mainFn}
          pictureName={oneDiv.imgPath} // Použitie atribútu raz
          // id={oneDiv.id}
          object={oneDiv}
        />
      ))}
    </>
  );
  }
  
 