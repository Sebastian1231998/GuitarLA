/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import { Badge, IconButton } from "@mui/material";
import authContext from "../context/auth/authContext";
import { useContext } from "react";
import { obtieneFiltroCarrito } from "../helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = ({ guitarra }) => {
  const router = useRouter();

  let [validaToken, cambiaValidaToken] = useState(false);
  let [valueToken, cambiaValueToken] = useState("");
  let [carritoUsuario, setCarritoUsuario] = useState(0);
  useEffect(() => {
    let token = localStorage.getItem("token");

    if (token) {
      cambiaValidaToken(true);
      cambiaValueToken(token);
    }

    let usuario = localStorage.getItem("Usuario");

    if (usuario) {
      let valor = obtieneFiltroCarrito().length;
      setCarritoUsuario(valor);
    }

    // eslint-disable-next-line
  }, [valueToken]);

  let authcontext = useContext(authContext);
  let { cerrarSesion } = authcontext;

  return (
    <header className={styles["header-image"]}>
      <div className="contenedor">
        <div className={styles.flex_header}>
          <Link href="/">
            <a>
              <Image width={200} height={100} src="/img/logo.svg" />
            </a>
          </Link>

          <nav className={styles.navegacion}>
            <Link href="/">Inicio</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/tienda">Tienda</Link>
            <Link href="/blog">Blog</Link>

            {validaToken && valueToken !== "undefined" ? (
              <>
                <IconButton aria-label="show card items" color="inherit">
                  <Link href="/carrito">
                    <Badge badgeContent={carritoUsuario} color="secondary">
                      <AddShoppingCartIcon className={styles.icon} />
                    </Badge>
                  </Link>
                </IconButton>

                <button
                  className={`btn btn-blank cerrar-sesion ${styles.cerrar_sesion}`}
                  onClick={() => cerrarSesion()}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link href="/login">Iniciar Sesión</Link>
            )}
          </nav>

          <Link href="/profile">
            <AccountCircleIcon
               className={styles.user}
             />
          </Link>
        </div>

        {guitarra && (
          <div className={styles.modelo}>
            <h2>Modelo {guitarra.titulo}</h2>
            <p>{guitarra.descripcion}</p>
            <p className={styles.precio}>${guitarra.precio}</p>
            <Link href={`/guitarra/${guitarra.url}`}>
              <a className={styles.enlace}>Más Información</a>
            </Link>
          </div>
        )}
      </div>

      {router.pathname === "/" && (
        <div className={styles.guitarra}>
          <Image
            layout="fixed"
            width={500}
            height={1200}
            src="/img/header_guitarra.png"
            alt="imagen guitarra header"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
