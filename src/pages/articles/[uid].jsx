import { useRouter } from "next/router"

const articles = () =>{
  const router = useRouter()
  const { uid, title } = router.query

  return (
    <>
      <h1>Article = {uid}  - {title}</h1>
    </>
  )
}

export default articles