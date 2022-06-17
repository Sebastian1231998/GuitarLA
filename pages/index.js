import Layout from "../components/layout";
import Listado from "../components/listado";
import Curso from "../components/curso";
import ListadoBlog from "../components/listadoBlog";


export default function Home({ guitarras, curso, entradas }) {
  return (

      <Layout pagina="Inicio" guitarra={guitarras[3]}>
        <main className="contenedor">
          <h1 className="heading">Nuestra Coleccion</h1>

          <Listado guitarras={guitarras} />
        </main>

        <Curso curso={curso} />

        <section className="contenedor">
          <ListadoBlog entradas={entradas} />
        </section>
      </Layout>
 
  );
}

export async function getServerSideProps() {
  const urlGuitarras = `${process.env.API_URL}/guitarras`;
  const urlCurso = `${process.env.API_URL}/curso`;
  const urlBlog = `${process.env.API_URL}/blogs?_limit=3&_sort=created_at:desc`;

  let [respuestaGuitarra, respuestaCurso, respuestaBlog] = await Promise.all([
    fetch(urlGuitarras),
    fetch(urlCurso),
    fetch(urlBlog),
  ]);

  let [guitarras, curso, entradas] = await Promise.all([
    respuestaGuitarra.json(),
    respuestaCurso.json(),
    respuestaBlog.json(),
  ]);

  return {
    props: {
      guitarras,
      curso,
      entradas,
    },
  };
}
