 // ---------------------------
 // ---------------------------file with included functions to make cleaner and more readable code
 // ---------------------------

 export function _stylingAfterLevel(color){
    // set background of page
    document.getElementsByTagName("BODY")[0].setAttribute('style', 'background-color: '+ color);
    
    // disappear settings buttons  
    document.getElementById("levelBtns").setAttribute('style', 'display: none'); 

    //change H3 content -> game instruction
    document.getElementsByTagName("H3")[0].textContent="Pre začatie hry slačte tlačítko štart"

    //show timer and starter of game
    document.getElementById("timeAndStart").setAttribute('style', 'display: flex');  
 }

 export function _stylingAfterStart(){
       //to hide start button 
       document.getElementById("start").setAttribute('style', 'display: none'); 
       document.getElementsByTagName("H3")[0].setAttribute('style', 'display: none'); 
       
       //style H1
       document.getElementsByClassName("welcome")[0].setAttribute('style', 'margin-top: 150px');
 
       //styling all react app id result
       document.getElementById("result").setAttribute('style', 'flex-direction: column'); 
 
       // to see images
       document.getElementsByClassName("column_content")[0].setAttribute('style', 'display: flex');
 }
