import {Button} from "./Button";


export const SetLevelBtns = ({my_setLevel}) =>{
  
  const arrLvl= ["normal", "harder", "hardest"];
  const btnsLvl = arrLvl.map((level) =>

    <Button my_setLevel={my_setLevel} id={level} key={level}/>

  )
    return (
      <>
        {btnsLvl}
      </>

    );
  }
  
  