import Layout from "../components/layout"


export default function Home({entradas}) {

  console.log(entradas)

  return (
      <Layout
      pagina="Blog"
      >
           <h1>Blog</h1>

      </Layout>
  )

}

export async function getServerSideProps(){

  const url = 'http://localhost:1337/blogs'

  const respuesta = await fetch(url) 
  
  const entradas = await respuesta.json();

  return{

    props:{
      entradas
    }
  }


}

