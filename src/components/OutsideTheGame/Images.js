import React from 'react'
import { Link } from "react-router-dom";
import {  useEffect, useState/*, useMemo*/ } from "react";
import './css/images.css';
import { fetchImageNames,preloadImages  } from '../../_inc/data.js';

 let arrImgIdsAndNames
// // (async () => {
  arrImgIdsAndNames = await fetchImageNames(); // waiting for img names array from firebase db

// const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];


const Images = () => {
  const [loadingImg, setLoadingImg] = useState(true);
  // const [renderedImgNamesArr, setRenderedImgs] = useState([]);

  // const arrImg = useMemo(() => [ "drop","sea","lightning", "space", "sun", "vibration", "wind", "wood"], []);


    useEffect(() => {

      preloadImages(arrImgIdsAndNames)
        // .then((loadedDivItems) => {
          .then(() => {
           // setRenderedImgs(loadedDivItems)

          setLoadingImg(false);      //-------------------------------------------set loading to false
        })
        .catch((err) => {
        // setError(err.message);    // save error message
        console.log("Not all images were loaded")
        // setLoadingImg(false);        //----------------------------------------set loading to false
        });
    }, [loadingImg,/*arrImg*/]);
    
    return (
      <div className="img-content">
        <h1>Hracie obrázky</h1>
        <div className="img-main-content">
          {loadingImg ? (//-------------------------------------------------------if loading show
            <div className="loading">
              <h1>Nacítavajú sa obrázky</h1>
            </div>
          ) : (//-----------------------------------------------------------------if not loading (after successful l.) show
            arrImgIdsAndNames.map((oneImg) => (
              <div className="" key={oneImg.id}>
                <Link to={`/about-game/images/${oneImg.name}`}>
                  <img src={`../pictures/pexeso/${oneImg.name}.jpg`} alt="Pexeso img" />
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    );
    
}

export default Images