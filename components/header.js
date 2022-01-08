import React from "react";
import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles["header-image"]}>
      <div className="contenedor">
        <div className={styles.flex_header}>
        <Link href="/">
          <Image width={200} height={100} src="/img/logo.svg" />
        </Link>

        <nav className={styles.navegacion}>
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/tienda">Tienda</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
