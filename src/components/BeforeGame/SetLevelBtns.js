import {LevelButton} from "./LevelButton";

//all three buttons to set level
export const SetLevelBtns = (props) =>{
  
  const arrLvl= ["normal", "harder", "hardest"];
  const btnsLvl = arrLvl.map((level_one) =>

    <LevelButton my_setLevel={props.my_setLevel} id={level_one} key={level_one}/>

  )
    return (
      <>
        {btnsLvl}
      </>

    );
  }
  
  