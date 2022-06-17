import React from "react";
import Layout from "../components/layout";
import ProductosCarrito from "../components/carrito/productosCarrito";

const Carrito = () => {
  return (

      <Layout>
        <h1 className="heading">Carrito de Compras</h1>

        <ProductosCarrito />
      </Layout>
 
  );
};

export default Carrito;
