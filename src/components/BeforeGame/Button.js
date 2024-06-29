export const Button = ({my_setLevel,id,text}) =>{

    //set level btn´s    

    return (
     
       <div onClick={(e) => {my_setLevel(e,id)}} id={id}>{text}</div>
      
    );
  }
  
  // export default Button;