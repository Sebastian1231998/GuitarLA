import React,{useState} from 'react';
import Alerta from '../alerta';
import { Rating } from '@mui/material';
import styles from "../../styles/Comments.module.css";
import { obtieneIniciales } from "../../helpers"

const Form = ({Usuario, onSubmitComment, alerta,changeComment, setValue}) => {



    
  let nuevasIniciales =  obtieneIniciales(Usuario.nombre)
  


  return (

    <li>
          <div className={styles.contenido_comments}>
            <div className={styles.avatar}>
              <span>{nuevasIniciales === null ? null :  nuevasIniciales.toUpperCase()}</span>
            </div>
            <div className={styles.comment_form}>
              <div className={styles.nombre_usuario}>{Usuario.nombre}</div>

              <Rating
                name="size-large"
                defaultValue={2}
                size="large"
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    setValue(newValue);
                  }
                }}
              />

              <form onSubmit={onSubmitComment}>
                {alerta ? (
                  <Alerta classAlert="error">El campo no puede ir vacío</Alerta>
                ) : null}
                <label className={styles.label} htmlFor="comentario">
                  Escribe tu valoración:
                </label>
                <textarea name="comentario" onChange={changeComment}></textarea>

                <input
                  type="submit"
                  className={styles.enviar_comentario}
                  value="Enviar"
                />
              </form>
            </div>
          </div>
        </li>
  );
};

export default Form;
