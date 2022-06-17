import React, { useEffect } from "react";
import Image from "next/image";
import styles from "../../styles/Guitarra.module.css";
import Layout from "../../components/layout";
import RatingGuitar from "../../components/rating";
import Comments from "../../components/comments";
import { useState } from "react";
import Alerta from "../../components/alerta";
import Link from "next/link";
const Producto = ({ guitarra, comments }) => {
  const { descripcion, imagen, titulo, precio, url, id, calificacion } =
    guitarra[0];

  const [cantidad, setCantidad] = useState(0);
  const [precioActualizado, setPrecio] = useState(precio);
  const [alerta, mostrarAlerta] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [texto, setTexto] = useState("");
  const [validaCarrito, setValidaCarrito] = useState(false);

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));
    let resultado;

    if (!carritoLocal) {
      localStorage.setItem("carrito", JSON.stringify([]));
    }

    let user = JSON.parse(localStorage.getItem("Usuario"));

    if (user !== null) {

      setUsuario(user);
    }

    if (carritoLocal.length > 0) {
      if (user) {
        resultado = carritoLocal.some((carrito) => {
          return (
            carrito.titulo == guitarra[0].titulo && carrito.correo == user.email
          );
        });

        if (resultado) {
          setValidaCarrito(true);
        } else {
          setValidaCarrito(false);
        }


      }
    }

    if (cantidad !== 0) {
      if (cantidad == 2) {
        setPrecio(precio * 2);
      } else if (cantidad == 3) {
        setPrecio(precio * 3);
      } else if (cantidad == 1) {
        setPrecio(precio);
      } else if (cantidad == 4) {
        setPrecio(precio * 4);
      }
    }
  }, [cantidad]);

  const onSumbitCarrito = (e) => {
    e.preventDefault();



    if (cantidad == "" || precioActualizado <= 0) {
      mostrarAlerta(true);
      setTexto("La cantidad no puede estar vacia");
      return;
    }


    if ( Object.keys(usuario).length == 0 || usuario == "undefined") {
      mostrarAlerta(true);
      setTexto("Debes iniciar sesión");
      return;
    }

    mostrarAlerta(false);

    let objCarrito = {
      titulo,
      imagen: imagen.url,
      calificacion,
      descripcion,
      correo: usuario.email,
      cantidad,
      precio: precioActualizado,
    };
    let carritoLocal = JSON.parse(localStorage.getItem("carrito"));

    let carritoActualizado = [...carritoLocal, objCarrito];
    localStorage.setItem("carrito", JSON.stringify(carritoActualizado));

    setValidaCarrito(true);
  };

  const onChangeCarrito = (e) => {
    setCantidad(e.target.value);
  };
  return (
    <Layout>
      <div className={styles.guitarra}>
        <Image
          layout="responsive"
          width={180}
          height={350}
          src={imagen.url}
          alt={`imagen ${titulo}`}
        />

        <div className={styles.contenido}>
          <h3>{titulo}</h3>
          <p className={styles.descripcion}>{descripcion}</p>
          <p className={styles.precio}>${precioActualizado}</p>
          <RatingGuitar calificacion={calificacion} />

          {alerta ? <Alerta classAlert="error">{texto}</Alerta> : null}
          <form className={styles.formulario} onSubmit={onSumbitCarrito}>
            {validaCarrito ? (
              <Link href="/carrito">
                <a className={styles.enlace}>Ver carrito</a>
              </Link>
            ) : (
              <>
                <label>Cantidad: </label>
                <select onChange={onChangeCarrito}>
                  <option value="">--Selecciona--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <input type="submit" value="Agregar Carrito" />
              </>
            )}
          </form>
        </div>
      </div>
      <Comments url={url} id={id} comments={comments} guitarra={guitarra} />
    </Layout>
  );
};

export async function getServerSideProps({ query: { url } }) {
  const urlConsulta = `${process.env.API_URL}/guitarras?url=${url}`;
  const respuestaGuitarra = await fetch(urlConsulta);
  const guitarra = await respuestaGuitarra.json();

  let { id } = guitarra[0];

  const urlComments = `${process.env.API_URL}/comentarios?_sort=created_at:desc&guitarra=${id}`;
  const respuestaComments = await fetch(urlComments);
  const comments = await respuestaComments.json();

  return {
    props: {
      guitarra,
      comments,
    },
  };
}

export default Producto;
