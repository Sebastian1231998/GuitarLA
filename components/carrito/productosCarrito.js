import React, { useEffect } from "react";
import styles from "../../styles/Carrito.module.css";
import { obtieneFiltroCarrito } from "../../helpers";
import { useState } from "react";
import Item from "./Item";
import Link from "next/link";
const ProductosCarrito = ({checkout, setPrecioPagar}) => {
  useEffect(() => {
    let usuario = JSON.parse(localStorage.getItem("Usuario"));

    if (usuario) {
      setCarrito(obtieneFiltroCarrito());

      const resultadoEffect = obtieneFiltroCarrito().reduce(
        (total, carrito) => carrito.precio + total,
        0
      );
      setResultado(resultadoEffect);

      if(checkout){
        setPrecioPagar(resultadoEffect)
      }
   
    }
  }, []);

  let [carrito, setCarrito] = useState([]);
  let [resultado, setResultado] = useState(0);

  const eliminarCarrito = (titulo) => {
    let filter = [];

    let itemSeleccionado = document.querySelector(`#${titulo}`);

    itemSeleccionado.remove();

    let idTitulo = itemSeleccionado.getAttribute("id");

    let usuario = JSON.parse(localStorage.getItem("Usuario"));

    if (usuario) {
      filter = obtieneFiltroCarrito().filter((itemcarrito) => {
        return (
          itemcarrito.titulo !== idTitulo &&
          itemcarrito.correo === usuario.email
        );
      });

      localStorage.setItem("carrito", JSON.stringify(filter));

      const resultadoEffect = obtieneFiltroCarrito().reduce(
        (total, carrito) => carrito.precio + total,
        0
      );
      setResultado(resultadoEffect);

     
    }
  };

  return (
    <div className=" contenedor">
      <p className={styles.item_descripcion}>

      {checkout ? "Resumen" : "Items en el carrito" }
    
      </p>

      <ul className={styles.ul_carrito}>
        {carrito.map((item) => (
          <>
            <Item
              key={item.titulo}
              item={item}
              eliminarCarrito={eliminarCarrito}
              checkout={checkout}
            />
          </>
        ))}
      </ul>

      <hr className={styles.hr} />

      <div className="pago">
        <p>Total:</p>
        <p className={styles.precio_final}>${resultado}</p>

        {carrito.length > 0 && !checkout ? 
          <Link href="/carrito/checkout" >
          <a className={styles.button}>Pagar</a>
        </Link>
        : null }
       
      </div>
    </div>
  );
};

export default ProductosCarrito;
