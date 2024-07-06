import {LevelButton} from "./LevelButton";

//all three buttons to set level
export const SetLevelBtns = ({my_setLevel}) =>{
  
  const arrLvl= ["normal", "harder", "hardest"];
  const btnsLvl = arrLvl.map((level) =>

    <LevelButton my_setLevel={my_setLevel} id={level} key={level}/>

  )
    return (
      <>
        {btnsLvl}
      </>

    );
  }
  
  