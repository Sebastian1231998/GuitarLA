import React, { useState } from "react";
import Paypal from "../../components/carrito/paypal";
import styles from "../../styles/Paypal.module.css";
import ProductosCarrito from "../../components/carrito/productosCarrito";
import { Link } from "@mui/material";
import { Alert } from "@mui/material";
import styled from "@emotion/styled";

const Ahref = styled.a`

margin: 2rem 0;
    border: none;
    padding: 1rem;
    display: block;
    background-color: var(--primary);
    width: 30%;
    font-weight: bold;
    color: white;
    transition-property: background-color;
    transition-duration: .3s;
    text-decoration: none!important;
    text-align: center;
    width: 100%;

    &::hover{
      background-color: var(--negro);

    }

`
const Checkoutitem = () => {
  let [precioPagar, setPrecioPagar] = useState(0);
  let [muestracompra, setMuestraCompra] = useState(false);
  let [id_transaccion, setIdTransaccion] = useState("");
  return (
    <>
      {muestracompra ? (
        <div className="contenedor">

       <div className={styles.information}>
          <Link href="/profile">
            <Ahref >Ver mis Ordenes</Ahref>
          </Link>
       

          <p className={styles.id_transaccion}>Muchas Gracias por tu compra!!, este es el Id Transaccion: {id_transaccion}</p>
         </div>

          <Alert
    
           style={{fontSize:"2rem"}}
           >Puedes darle un seguimiento en tu perfil. /profile</Alert>
        </div>
      ) : (
        <div className={`contenedor ${styles.paypal}`}>
          <div className={styles.contenido_paypal}>
            <Paypal
              precioPagar={precioPagar}
              setMuestraCompra={setMuestraCompra}
              setIdTransaccion={setIdTransaccion}
            />
          </div>
          <div className="">
            <ProductosCarrito checkout={true} setPrecioPagar={setPrecioPagar} />
          </div>
        </div>
      )}
    </>
  );
};

export default Checkoutitem;
