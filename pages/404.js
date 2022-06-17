import React from "react";
import Link from "next/link";
import styles from "../styles/NoEncontrado.module.css";
const NoEncontrado = () => {
  return (
    <div className={styles.no_encontrado}>
      <h2>No encontrado</h2>

      <Link href="/">
        <a className={styles.enlace} >Volver al inicio</a>
      </Link>
    </div>
  );
};

export default NoEncontrado;
