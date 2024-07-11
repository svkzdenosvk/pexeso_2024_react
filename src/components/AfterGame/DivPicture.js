 //component about one single picture

export const DivPicture = (props) =>{

 // ---------------------------
 // ---------------------------timing fn´s
 // ---------------------------

  function stopTimer(){/*----------------------------------------------------------stop seconds increment */
    clearInterval(props.intervalSecond);
    document.getElementById("seconds").style.display="none";
  }

  function _fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}/*--------------------formate seconds -> time */

 // ---------------------------
 // ---------------------------ending fn
 // ---------------------------

  function checkEnd(){/*----------------------------------------------------------check if is end == each picture removed */
    // setTimeout(function(){
        if(!document.getElementById("row").firstElementChild){/*------------------if all images on page are removed */

            stopTimer();/*--------------------------------------------------------stop increment seconds */
            let endTime=_fmtMSS(props.seconds);/*---------------------------------------formating time */

            document.getElementsByTagName("BODY")[0].firstElementChild.classList.add('div_center');/*---------------start ---animation of gratulation text */
            let timeArr=endTime.split(":");/*--------------------------------------split time string (seconds:minutes) to array for separate minutes and second in gratulation text */

            document.getElementsByTagName("H1")[0].innerHTML = "Gratulácia, vyhrali ste za "+(timeArr[0]==="0"?"":timeArr[0]+"m")+" "+ timeArr[1]+"s";
            document.getElementsByTagName("H1")[0].classList.add('h1End');/*------------------------------------end ---animation of gratulation text */
        }
    // }, 50);
}


 // ---------------------------
 // ---------------------------fn´s to show / hide animate and delete div>imgs
 // ---------------------------


  function _deleteImg(el,checkEndCallBack){/*--------------------------------------------------------partial f. to remove the same showed images*/
       el.remove();
       setTimeout(function(){
        checkEndCallBack();
       }, 50);
  }

  function _animate(element, deleteImgCallBack,checkEndCallBack){/*----------------------------------------------------- animation to rotate -> then delete div>img*/ 

    element.classList.add("rotate-center");
    //rewriten as callback f.
     setTimeout(function(){
       deleteImgCallBack(element,checkEndCallBack);
   }, 210);
  }
  
  function animateAndDelete(first,second){/*-----------------------------------------matched img´s animate->delete*/ 

    _animate(first, _deleteImg, checkEnd);
    _animate(second, _deleteImg, checkEnd);
  }

  function _hideImage(elm){/*--------------------------------------------------------partial f. to hide showed image unmatched*/
    elm.classList.add('mask');/*-----------------------------------------------------hide image below joker´s image*/
    elm.firstElementChild.style.opacity="0";/*---------------------------------------hide image*/
    elm.classList.remove('selected_Div_img');/*------------------------------------------remove specific class for identification*/
  }

 // ---------------------------
 // ---------------------------main fn to compare
 // ---------------------------

 function mainFn(element) {/*--------------------------------------------------------the most main function to manage pexeso-code */
       
    if(element.classList.contains('mask')){/*----------------------------------------if on image is joker´s image */

      var imgElm = element.firstElementChild;
      imgElm.style.opacity="100";/*--------------------------------------------------show image */
      element.classList.remove('mask');/*--------------------------------------------remove joker image */
      element.classList.add('selected_Div_img');/*---------------------------------------give specific class for identification*/


      if(props.stticSource===""){/*--------------------------------------------------------if no image is shown, get attribute from clicked*/
         
        props.setStticSource(imgElm.getAttribute("src"));
      }else{/*-----------------------------------------------------------------------compare sources attribute of showed and clicked */
          document.body.style.pointerEvents = "none";

          let firstSelectedImg = document.getElementsByClassName("selected_Div_img")[0];
          let secondSelectedImg= document.getElementsByClassName("selected_Div_img")[1];

          if(props.stticSource===imgElm.getAttribute("src")){/*----------------------------if the same --> remove images */
              //  document.body.style.pointerEvents = "none";/*-------------------------prevent to show third image*/
        
                  animateAndDelete(firstSelectedImg,secondSelectedImg);
                                                            
                  document.body.style.pointerEvents = "auto";/*----------------------give back functionality to pointer*/
                  
                  props.setStticSource("");
                                     
          }else{/*-------------------------------------------------------------------if NOT the same src-path --> hide images below joker img */
              // document.body.style.pointerEvents = "none";/*--------------------------prevent to show third image*/

              setTimeout(function(){

                  _hideImage(firstSelectedImg);
                  _hideImage(secondSelectedImg);

                  document.body.style.pointerEvents = "auto";/*----------------------give back functionality to pointer*/

                  props.setStticSource("");/*----------------------------------------------clear comparable variable */

                  props.shuffle();/*-----------------------------------------------==------in harder (and hardest) version ... shuffle after bad trying*/
                    
              }, 300);
          }
      }
  
   }
}

    return (
        <div onClick={(e) => {mainFn(e.target.parentNode)}} className='mask div_on_click' key={props.index}>
            <img  src={"pictures/pexeso/"+props.pictureName+".jpg"} alt='Smiley face' />  
        </div> 
    )
  }
  