import { forwardRef, useEffect, useRef, useImperativeHandle } from "react"

import ProgressiveImage from "./ProgressiveImage"

const Card = forwardRef((props, ref)=>{
  // const cardRef = useRef()

  // useImperativeHandle(ref, () => ({
  //   getCurrent: () => {
  //     return cardRef.current;
  //   },
  //   getProps: ()=>{
  //     return props
  //   }
  // }));
  useEffect(()=>{
    if(ref){
      // console.log(ref.current)
      ref.current = { index: props.index, node: ref.current }
    }
  }, [ref, props.index])

  return(
    <div ref={ref} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '8px', border: '1px solid #ababab', paddingBottom: '12px'}}>
      <ProgressiveImage image={props.profile} style={{ width: '100%', borderRadius: '1em' }}/>
      <p>{props.name} - {props.species}</p>
      <b>{props.location}</b>
    </div>
  ) 
})

export default Card