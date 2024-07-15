 // ---------------------------
 // ---------------------------file with included functions to make cleaner and more readable code
 // ---------------------------

 export function _stylingAfterLevel(color){/*---------------------f. for style changes after select level ..inc to App.js*/
    // set background of page
    document.getElementsByTagName("BODY")[0].setAttribute('style', 'background-color: '+ color);
    
    // disappear settings buttons  
    document.getElementById("levelBtns").setAttribute('style', 'display: none'); 

    //change H3 content -> game instruction
    document.getElementsByTagName("H3")[0].textContent="Pre začatie hry slačte tlačítko štart"

    //show timer and starter of game
    document.getElementById("timeAndStart").setAttribute('style', 'display: flex');  
 }

 export function _stylingAfterStart(){/*-------------------------------------------------f. for style changes after click on "start" button ..inc to TimeAndStart.js*/
       //to hide start button 
       document.getElementById("start").setAttribute('style', 'display: none'); 
       document.getElementsByTagName("H3")[0].setAttribute('style', 'display: none'); 
        
       //styling all react app id result
       document.getElementById("result").setAttribute('style', 'justify-content: start; flex-direction: column');

       // to see images
       document.getElementsByClassName("column_content")[0].setAttribute('style', 'display: flex');
 }

 export function _shuffleArray(array) {/*-------------------------------------------------partial f. to shuffle random positions in array stolen from : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array  (EDIT: Updating to ES6 / ECMAScript 2015) */
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}  