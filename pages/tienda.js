import Layout from "../components/layout";
import Listado from "../components/listado";

export default function Home({ guitarras }) {

  return (
    <Layout pagina="Tienda">
      <h1 className="heading">Nuestra Colección </h1>

      <main className="contenedor">
        <Listado guitarras={guitarras} />
      </main>
    </Layout>
  );
}

export async function getServerSideProps() {
  const url = `${process.env.API_URL}/guitarras`;
  const respuesta = await fetch(url);
  const guitarras = await respuesta.json();

  return {
    props: {
      guitarras,
    },
  };
}
