export const Button = ({my_setLevel,id}) =>{

    //set level btn´s    

    return (
     
       <div onClick={(e) => {my_setLevel(e,id)}} id={id} >{id.toUpperCase()}</div>
      
    );
  }
  
  // export default Button;