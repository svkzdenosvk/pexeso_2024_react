export const LevelButton = ({my_setLevel,id}) =>{

    //single button to set level  

    return (
     
       <div onClick={(e) => {my_setLevel(e,id)}} id={id} >{id.toUpperCase()}</div>
      
    );
  }
  
