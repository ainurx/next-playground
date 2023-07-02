const Articles = () =>{
  return(
    <>
      <div>
        <h1>Articles</h1>
      </div>
    </>
  )
}

export function getServerSideProps(context){
  return {
    props: {
      screen: 'Article'
    }
  }
}

export default Articles