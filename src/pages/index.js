
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()
 
  return (
    <div style={{ backgroundColor: '#F5F5F5'}}>
      <h1>HOME</h1>
    
      <p onClick={()=> router.push('/post')}>To post screen</p>
    </div>
  )
}
