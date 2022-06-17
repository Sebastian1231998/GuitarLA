import React from "react";
import Guitarra from "./guitarra";
import styles from "../styles/Listado.module.css"
export const Listado = ({ guitarras }) => {

  return (
    <div className={styles.listado}>
      {guitarras.map((guitarra) => (
        <Guitarra 
        key={guitarra.id}
        guitarra={guitarra}
         />
      ))}
    </div>
  );
};

export default Listado;
