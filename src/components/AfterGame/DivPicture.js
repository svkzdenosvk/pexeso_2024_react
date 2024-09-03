 //component about one single div > picture

export const DivPicture = (props) =>{

    return (
        <div onClick={(e) => {props.sendingFunction(e.target.parentNode, props.object)}} className='mask div_on_click' >
            <img  src={"pictures/pexeso/"+props.pictureName+".jpg"} alt='Smiley face' />  
        </div> 
    )
  }
  