import Layout from "../components/layout";
import ListadoBlog from "../components/listadoBlog";

export default function Home({ entradas }) {


  return (

    <Layout pagina="Blog">
      <main className="contenedor">
        <ListadoBlog entradas={entradas} />
      </main>
    </Layout>
 
  );
}

export async function getServerSideProps() {
  const url = `${process.env.API_URL}/blogs?_sort=created_at:desc`;

  const respuesta = await fetch(url);
  const entradas = await respuesta.json();

  return {
    props: {
      entradas,
    },
  };
}
