import React, { useState, useEffect, useRef } from 'react'

import _ from 'lodash'

import Card from './Card'

const HorizontalScrollCard = (props) =>{
  const [data, setData] = useState([])

  useEffect(()=>{
    console.log(props.data)
    setData(props.data)
  }, [props.data])

  return (
    <div style={{ padding: '12px 8px'}}>
      <div style={{
        display: 'flex',
        overflowX: 'scroll',
        overflowY: 'hidden',
        backgroundColor: 'grey',
        padding: '8px 16px'
      }}>
        {
          _.map(props.data, (d, index)=>(
            <Card
              style={{
                minWidth: '220px',
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
  )
}

export default HorizontalScrollCard