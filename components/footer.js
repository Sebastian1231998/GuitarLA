import styles from "../styles/Footer.module.css";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`contenedor ${styles.flex_footer}`}>
        <nav className={styles.navegacion}>
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/tienda">Tienda</Link>
          <Link href="/blog">Blog</Link>
        </nav>

        <p className={styles.copyrigth}>Todos los derechos reservados &copy; </p>
      </div>
    </footer>
  );
};

export default Footer;
