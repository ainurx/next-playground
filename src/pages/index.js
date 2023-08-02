import Reacct, { useState, useEffect } from 'react'
import { useRouter } from "next/router"

import axios from 'axios'

import HorizontalScrollCard from "@/components/HorizontalScrollCard"

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState()

  useEffect(()=>{
    initPost()
  }, [])
 
  const initPost = async () =>{
    try{
      setLoading(true)
      setTimeout(async ()=>{
        const res = (await axios.get(`https://rickandmortyapi.com/api/character/?page=1`)).data.results
        setPost(res)
        setLoading(false)
      }, 2000)
    } catch (err){
      console.log(err)
    }
  }

  return (
    <div style={{ backgroundColor: '#F5F5F5'}}>
      <h1>HOME</h1>
    
      <p onClick={()=> router.push('/post')}>To post screen</p>

      <h1>HSC</h1>
      {
        loading ? 
        <p>Loading</p>:
        <HorizontalScrollCard
          data={post}
        />
      }
    </div>
  )
}
