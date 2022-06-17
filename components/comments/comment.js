import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Rating } from "@mui/material";
import styles from "../../styles/Comments.module.css";
import { obtieneIniciales } from "../../helpers"
import { useState } from "react";
const CommentList = ({newcomment}) => {

 let iniciales =  obtieneIniciales(newcomment.nombre_usuario)

  return (

    <>
    <li key={newcomment.id}>
      <div className={styles.contenido_comments}>
        <div className={styles.avatar}>
          <span>{iniciales.toUpperCase()}</span>
        </div>
        <div className={styles.col_2}>
          <div className={styles.nombre_usuario}>
            {newcomment.nombre_usuario}
          </div>
          <div className={styles.rating}>
            <div className={styles.fecha}>{newcomment.fecha}</div>
            <Rating
              name="size-large"
              defaultValue={newcomment.rating_user}
              size="large"
              readOnly
            />
          </div>
          <div className="comentario">{newcomment.comentario}</div>
          <ThumbUpIcon className={styles["icon-like-comment"]} />
          <ThumbDownIcon className={styles["icon-dislike-comment"]} />
        </div>
      </div>
    </li>
    <hr />
  </>

  );
};

export default CommentList;
