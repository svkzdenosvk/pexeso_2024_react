export const LevelButton = (props) =>{

    //single button to set level  
    const levelNames = {
       easy:  ["ľahký"],
       medium:  ["stredný"],
       hard: ["ťažký"]
     }

     // _setLevelStyleChanges(levelChanges[levelName][0],levelChanges[levelName][1]);
    return (
     
      //  <div onClick={(e) => {props.my_setLevel(props.id)}} id={props.id} >{props.id.toUpperCase()}</div>
       <div onClick={(e) => {props.my_setLevel(props.id)}} id={props.id} >{levelNames[props.id][0].toUpperCase()}</div>

    );
  }
  
