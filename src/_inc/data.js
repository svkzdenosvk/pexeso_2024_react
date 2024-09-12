import {_shuffleArray }from './_inc_functions.js'


const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
const doubleImgs= [...arrImg, ...arrImg];

//to shuffle before every game
_shuffleArray(doubleImgs)

//generate UUID random keys
const uuid = require('uuid')

//creation of 2-dimensional array: - out of component to make id´s stable
// ['123e4567-e89b-12d3-a456-426614174000', 'lightning'],
// ['123e4567-e89b-12d3-a456-426614174001', 'drop'],..
const imgsWithKeys = doubleImgs.map(pictureName => [uuid.v4(), pictureName]);

//array of img names -> div>img
let divItems = imgsWithKeys.map(([id, pictureName]) =>(
  { id: id, imgPath: pictureName, classNames:["mask"] } 
))

export {divItems}