import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Guitarra.module.css";
const Guitarra = ({ guitarra }) => {
  const { descripcion, imagen, titulo, precio, url } = guitarra;
  return (
    <div className={styles.guitarra}>
      <Image
        layout="responsive"
        width={200}
        height={350}
        src={imagen.url}
        alt={`imagen ${titulo}`}
      />

      <div className={styles.contenido}>
        <h3>{titulo}</h3>
        <p className={styles.descripcion}>{descripcion}</p>
        <p className={styles.precio}>${precio}</p>

        <Link href={`/guitarra/${url}`}>
          <a className={styles.enlace}>Ver Guitarra</a>
        </Link>
      </div>
    </div>
  );
};

export default Guitarra;
