import React from "react";
import styles from "../styles/Alerta.module.css"


const Alerta = ({ children, classAlert }) => {


  const alertaClase =  classAlert === "error" ?  styles.error : styles.sucess  ; 
  
  return <div className={`${alertaClase} ${styles.alerta}`}>{children}</div>;
};

export default Alerta;
