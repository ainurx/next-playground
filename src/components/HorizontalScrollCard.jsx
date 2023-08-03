import React, { useState, useEffect, useRef } from 'react'

import _ from 'lodash'

import Card from './Card'

const HorizontalScrollCard = (props) =>{
  const wrapperRef = useRef()
  let cardRef = []
  const [data, setData] = useState([])
  let pHorizontal = 0

  useEffect(()=>{
    setData(props.data)
  }, [props.data])

  const setRef = (index) => (ref) => {
    cardRef[index] = ref
  }

  const prevClicked = () => {
    console.log('prevClicked ...')
    cardRef[0].scrollIntoView()
    pHorizontal -= 520
    wrapperRef.current.style.transform = `translate(${pHorizontal}px, 0)`
  }

  const nextClicked = () =>{
    console.log('nextClicked ...')
    console.log(wrapperRef)
    pHorizontal += 520
    wrapperRef.current.style.transform = `translate(-${pHorizontal}px, 0)`
    wrapperRef.current.style.transition = 'transform 330ms ease-in-out'
  }

  return (
    <div style={{ padding: '12px 64px', backgroundColor: 'red', position: 'relative'}}>
      <div style={{ backgroundColor: 'blue', overflow: 'hidden'}}>
        <div 
          ref={wrapperRef}
          style={{
            display: 'flex',
            // overflowX: 'hidden',
            // overflowY: 'hidden',
            backgroundColor: 'grey',
          }}
        >
          {
            _.map(data, (d, index)=>(
              <Card
                ref={setRef(index)}
                style={{
                  minWidth: '248px',
                  margin: '6px 4px'
                }}
                index={index}
                key={`item-${d.charId}-${index}`}
                charId={d.charId}
                profile={d.image}
                name={d.name}
                species={d.species}
                location={d.location.name}
              />
            ))
          }
        </div>
      </div>
      <div onClick={prevClicked} style={{ position: 'absolute', top: '50%', left: 0, transform: 'translate(0, -50%)'}}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
          <p>Previous</p>
        </div>
      </div>
      <div onClick={nextClicked} style={{ position: 'absolute', top: '50%', right: 0, transform: 'translate(0, -50%)'}}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
          <p>Next</p>
        </div>
      </div>
    </div>
  )
}

export default HorizontalScrollCard