import React from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import styles from "../../styles/Carrito.module.css";

const Item = ({ item, eliminarCarrito, checkout }) => {
  return (
    <li id={item.titulo}>
      <div className={styles.contenedor_carrito}>
        <Image src={item.imagen} width={400} height={100} />
        <div className={styles.content_p}>
          <div className={styles.contenido_item}>
            <h4>{item.titulo}</h4>
            <Rating value={item.calificacion} readOnly />
            <p className={styles.descripcion}>{item.descripcion}</p>
          </div>

          <p className={styles.precio}>${item.precio}</p>

          {checkout ? null : (
            <button
              onClick={() => eliminarCarrito(item.titulo)}
              className={styles.eliminar}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default Item;
