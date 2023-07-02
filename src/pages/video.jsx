import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

export default function video(){
  const videoRef = useRef(null)

  useEffect(()=>{

  }, [])

  return(
    <>
      <h1>Testing React Player</h1>
      <ReactPlayer
        ref={videoRef}
        controls
        url='https://www.youtube.com/watch?v=yHeKqWISjyg'
        playing={true}
        loop={true}
      />
      <button onClick={()=> videoRef.current.seekTo(30, 'seconds')}>play from beginning</button>
    </>
  )
}