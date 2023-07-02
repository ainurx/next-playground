import React, { useState, useEffect } from "react";

const ProgressiveImage = ({image, style}) =>{
  const [imgSource, setImgSource] = useState(image) 
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(()=>{
    setTimeout(() => {
      const img = new Image()
      img.src = image
      img.onload = () => {
        setImgSource(image)
        setImgLoaded(true)
      }
    }, 500);
  }, [image])

  return(
    <>
      {
        imgLoaded? 
        <img 
          src={imgSource}
          alt={imgSource}
          style={{...style}}  
        />
        :
        <div style={{
          backgroundColor: '#F0F0F0',
          width: '100%',
          height: '200px'
        }}></div>
      }
    </>
  )
}

export default ProgressiveImage