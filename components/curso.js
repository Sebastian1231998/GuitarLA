import React from "react";
import styles from "../styles/Curso.module.css";
const Curso = ({ curso }) => {


  const { descripcion, imagen, titulo } = curso;
  return (
    <section>
      <div className={`contenedor ${styles.grid}`}>
        <div className={styles.contenido}>
          <h2 className="heading">{titulo}</h2>
          <p className={styles.texto}>{descripcion}</p>
          <a href="!#" className={styles.enlace}>Más Información</a>
        </div>
      </div>

      <style jsx>{`
        section {
          padding: 10rem 0;
          margin: 2rem 0;
          background-image: linear-gradient(
              to right,
              rgb(0 0 0 / 0.65),
              rgb(0 0 0 / 0.7)
            ),
            url(${imagen.url});
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 50%;
        }
      `}</style>
    </section>
  );
};

export default Curso;
