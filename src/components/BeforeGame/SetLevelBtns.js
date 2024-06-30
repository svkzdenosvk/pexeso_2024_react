import {Button} from "./Button";


export const SetLevelBtns = () =>{
    return (
      <div id="levelBtns" >
        <Button /*my_setLevel={my_setLevel}*/ text="NORMAL" id="normal"/>
        <Button /*my_setLevel={my_setLevel}*/ text="HARDER" id="harder"/>
        <Button /*my_setLevel={my_setLevel}*/ text="HARDEST" id="hardest"/>

      </div>
    );
  }
  
  