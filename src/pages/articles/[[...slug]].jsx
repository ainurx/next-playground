import { useEffect } from "react"
import { useRouter } from "next/router"

const test = ({title}) =>{
  const router = useRouter()
  const { slug } = router.query

  useEffect(()=>{
    console.log(slug)
  }, [slug])

  return(
    <div>
      <p>test {title}</p>
      <p>{slug}</p>
    </div>
  )
}

export async function getStaticProps(context){
  console.log(context)

  return {
    title: 'Learn next js'
  }
} 

export default test