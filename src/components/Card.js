import { Component, forwardRef, useEffect, useRef, useImperativeHandle } from "react"

import ProgressiveImage from "./ProgressiveImage"

class MainCard extends Component{

  componentDidMount(){
    console.log(this.props)
  }

  render(){
    return(
      <div ref={this.props.forwardRef} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '8px', border: '1px solid #ababab', paddingBottom: '12px', ...this.props.style}}>
        <ProgressiveImage image={this.props.profile} style={{ width: '100%', borderRadius: '1em' }}/>
        <p>{this.props.name} - {this.props.species}</p>
        <b>{this.props.location}</b>
      </div>
    )
  }
}

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
    console.log('ref from parent')
    console.log(ref)
    if(ref){
      console.log(`===> Card[] forwardRef useEffect`)
      console.log(ref)
      // console.log(ref.current)
      ref.current = { index: props.index, node: ref.current }
    }
  }, [ref, props.index])

  return(
    <MainCard forwardRef={ref} {...props}/>
  ) 
})

export default Card