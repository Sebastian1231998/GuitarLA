import * as React from "react";
import CommentList from "./comments/comment";
import styles from "../styles/Comments.module.css";
import { useState, useEffect } from "react";
import Alerta from "./alerta";
import { formatearFecha } from "../helpers";
import Form from "./comments/form";

export default function CommentGuitar({
  idGuitarra,
  commentsGuitarra,
  guitarra,
}) {
  let [rating, setValue] = useState(2);
  let [Usuario, setUsuario] = useState({});
  let [alerta, setAlerta] = useState(false);
  let [sucess, setSucess] = useState(false);
  let [muestraComentario, setMuestraComentario] = useState(false);
  let [totalComments, actualizaTotalComments] = useState(commentsGuitarra);
  let [validacomentario, setComentario] = useState(false);
  let [Comment, setComment] = useState({
    nombre_usuario: "",
    comentario: "",
    rating_user: "",
    fecha: "",
    guitarra: "",
    correo: "",
  });

  useEffect(() => {
    let usuarioActual = localStorage.getItem("Usuario");

    if (usuarioActual && Object.keys(Usuario).length === 0) {
      setUsuario(JSON.parse(usuarioActual));
    }

    if (Object.keys(Usuario).length === 0) {
      setMuestraComentario(true);
    } else {
      setMuestraComentario(false);
      let resultado = totalComments.some((comment) => {
        return comment.correo === Usuario.email;
      });

      if (resultado) {
        setComentario(true);
      } else {
        setComentario(false);
      }
    }
    setComment({
      ...Comment,
      rating_user: rating,
    });
  }, [rating, Usuario]);

  const changeComment = (e) => {
    setComment({
      ...Comment,
      [e.target.name]: e.target.value,
      nombre_usuario: Usuario.nombre,
      fecha: formatearFecha(new Date()),
      guitarra: guitarra[0],
      correo: Usuario.email,
    });
  };

  let { comentario } = Comment;

  const onSubmitComment = (e) => {
    e.preventDefault();

    if (comentario === "") {
      setAlerta(true);
      return;
    }

    setAlerta(false);
    actualizaApi(Comment);

    setSucess(true);
  };

  const actualizaApi = async (comentario) => {
    let contador = 0;

    totalComments.forEach((comment) => {
      contador += comment.rating_user;
    });
    let ratingActualizado = (contador + rating) / (totalComments.length + 1);

    let ratingRequest = {
      calificacion: ratingActualizado,
    };

    let urlConsultaGuitarra = `${process.env.NEXT_PUBLIC_API_URL}/guitarras/${idGuitarra}`;
    let urlConsultaComment = `${process.env.NEXT_PUBLIC_API_URL}/comentarios`;

    const optionsPUT = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingRequest),
    };

    const optionsPOST = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comentario),
    };

    let [respuestaGuitarra, respuestaComment] = await Promise.all([
      fetch(urlConsultaGuitarra, optionsPUT),
      fetch(urlConsultaComment, optionsPOST),
    ]);

    let [guitarraActualizada, comentarioAgregado] = await Promise.all([
      respuestaGuitarra.json(),
      respuestaComment.json(),
    ]);

    actualizaTotalComments(guitarraActualizada.comentarios);
  };

  let texto =
    muestraComentario && !sucess
      ? " Inicia Sesión si deseas comentar"
      : "Gracias por tu valoración";

  texto = validacomentario ? "Ya has generado una votacion" : texto;
  return (
    <ul className={styles.ul_comments}>
      {muestraComentario || validacomentario || sucess ? (
        <Alerta classAlert="sucess"> {texto} </Alerta>
      ) : (
        <Form
          Usuario={Usuario}
          onSubmitComment={onSubmitComment}
          alerta={alerta}
          changeComment={changeComment}
          setValue={setValue}
        />
      )}

      {totalComments.length > 0 ? (
        <h2 className="heading">Comentarios</h2>
      ) : (
        <h2 className="heading">No hay Comentarios</h2>
      )}

      {totalComments.map((newcomment) => (
        
        <CommentList 
        newcomment={newcomment} 
        key={newcomment.id} 
        Usuario={Usuario}

        />
      ))}
    </ul>
  );
}
