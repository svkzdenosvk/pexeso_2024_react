export const LevelButton = (props) =>{

    //single button to set level  

    return (
     
       <div onClick={(e) => {props.my_setLevel(props.id)}} id={props.id} >{props.id.toUpperCase()}</div>
      
    );
  }
  
