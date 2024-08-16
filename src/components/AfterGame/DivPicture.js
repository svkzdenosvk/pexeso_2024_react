import { useRef } from "react";

import { _fmtMSS, _myToggle } from "./../../_inc/_inc_functions";

 //component about one single div > picture

export const DivPicture = (props) =>{
  const firstRef = useRef(null);
  const secondRef = useRef(null);

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
   // console.log(el.firstElementChild)

    el.remove();
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
  
  function animateAndDelete(first, second){/*------------------------..-----------------matched img´s animate->delete*/ 
    _animate(first, _deleteImg, checkEnd);

    if(second) {
      _animate(second, _deleteImg, checkEnd);
    } else {
      console.log("bug bol v animate")
        const selectedImgAgain = document.getElementsByClassName("selected_Div_img");
        console.log(selectedImgAgain.length)
        for (let selectedElement of selectedImgAgain) {

          _animate(selectedElement, _deleteImg, checkEnd);
        }
      }

    // if(!second){ second= document.getElementsByClassName("selected_Div_img")[0];}
    // _animate(second, _deleteImg, checkEnd);
    // }
  }

  function showImg(element){
    _myToggle(element,'mask','selected_Div_img');
  }

  function hideUnMatched(first,second){/*---------------------------------------------if shown images do not match -> hide them back  */
    _myToggle(first, 'selected_Div_img', 'mask');

    if(second) {
      _myToggle(second, 'selected_Div_img', 'mask');
    } else {
        const selectedImgCol = document.getElementsByClassName("selected_Div_img");
        for (let element of selectedImgCol) {
          _myToggle(element, 'selected_Div_img', 'mask');
        }
      }
  }

  function settingAfterComparison(){
    document.body.style.pointerEvents = "auto";/*--------------------------------------give back functionality to pointer*/
    props.setStticSource("");/*--------------------------------------------------------clear comparable variable */
  }

 // ---------------------------
 // ---------------------------main fn to compare
 // ---------------------------

  function mainFn(element) {/*---------------------------------------------------------the most main function to manage pexeso-code */

    if(element.classList.contains('mask')){/*------------------------------------------if on image is joker´s image */

      var imgElm = element.firstElementChild;
      showImg(element);/*--------------------------------------------------------------remove joker image and show img under */
      
      if(props.stticSource===""){/*----------------------------------------------------if no image is shown, get attribute from clicked*/
         
         props.setStticSource(imgElm.getAttribute("src"));
      }else{/*-------------------------------------------------------------------------compare sources attribute of showed and clicked */
          document.body.style.pointerEvents = "none";/*--------------------------------prevent to show third image */

          const selectedImgCol = document.getElementsByClassName("selected_Div_img");

          firstRef.current = selectedImgCol[0];
          secondRef.current= selectedImgCol[1];
          
          if(props.stticSource===imgElm.getAttribute("src")){/*------------------------if the same --> remove images */
        
                // setTimeout(function(){
                  animateAndDelete(firstRef.current,secondRef.current);
                  
                  settingAfterComparison();

                // }, 300);
                                                                                                 
          }else{/*---------------------------------------------------------------------if NOT the same src-path --> hide images below joker img */

                setTimeout(function(){

                  hideUnMatched(firstRef.current,secondRef.current);
               
                  settingAfterComparison();

                  if( props.level==="harder" || props.level==="hardest"){
                    props.shuffle();/*---------------------------------------------------in harder (and hardest) version ... shuffle after bad trying*/
                  }  

                }, 300);
          }
      }
    }
  }

    return (
        <div onClick={(e) => {mainFn(e.target.parentNode)}} className='mask div_on_click' >
            <img  src={"pictures/pexeso/"+props.pictureName+".jpg"} alt='Smiley face' />  
        </div> 
    )
  }
  