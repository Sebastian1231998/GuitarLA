import Layout from "../../components/layout";
import Image from "next/image";
import { formatearFecha } from "../../helpers";
import styled, { keyframes } from "styled-components";
import styles from '../../styles/Entrada.module.css'
const EntradaBlog = ({ entrada }) => {
  const { contenido, published_at, titulo, imagen } = entrada[0];




  const transitionTyping = keyframes` 
        from {
                width: 0
            }
        `;

  const transitionBlink = keyframes`
  
  50%{
      border-color: transparent
    }
  `;

  const Effect = styled.h2`
    display: block;
    font-family: monospace;
    white-space: nowrap;
    border-right: 4px solid;
    width: ${titulo.length + "ch"};
    animation: ${transitionTyping} 2s steps(${titulo.length}),
     ${transitionBlink} 1s infinite step-end alternate;
    overflow: hidden;
    text-align:center;
    font-size:2.5rem;

    @media(min-width:768px){

      font-size:4rem
    }
  `;

  


  return (
    <Layout pagina={titulo}>
      <main className="contenedor">
      
        <article className={styles.entrada}>

        <Effect className={`heading`}>{titulo}</Effect>
          <Image
            src={imagen.url}
            width={800}
            height={600}
            layout="responsive"
            alt={`imagen blog ${titulo}`}
          />

          <div>
            <p className={styles.fecha}>{formatearFecha(published_at)}</p>
            <p className={styles.texto}>{contenido}</p>
          </div>
        </article>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const url = "http://localhost:1337/blogs";
  const respuesta = await fetch(url);
  const entradas = await respuesta.json();

  let paths = entradas.map((entrada) => ({
    params: { url: entrada.url },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { url } }) {
  const urlBlog = `${process.env.API_URL}/blogs/?url=${url}`;
  const respuesta = await fetch(urlBlog);
  const entrada = await respuesta.json();


  return {
    props: {
      entrada,
    },
  };
}

export default EntradaBlog;
