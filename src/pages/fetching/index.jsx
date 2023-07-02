import React from 'react'

import axios from 'axios'

export default function fetching({pokemon}){

  React.useEffect(()=>{
    console.log(pokemon)
  }, [])

  return(
    <>
      <h1>Data Fetching</h1>
      <p> Pokemon name = {pokemon.species.name}</p>
    </>
  )
}

export const getServerSideProps = async() =>{
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto')

  return {
    props:{
      pokemon: res.data
    }
  }
}

// export default fetching