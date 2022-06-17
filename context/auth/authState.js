import React, { useReducer } from "react";
import {
  REGISTRO_ERROR,
  OBTENER_USUARIOS,
  LOGIN_EXITOSO,

} from "../../types";
import authReducer from "./authReducer";
import authContext from "./authContext";
import contextAxios from "../../config/axios";
import authToken from "../../config/token";
import Router from "next/router";

const AuthState = (props) => {
  let initialState = {

    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando:true
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //funciones

  const crearUsuarioBD = async (datos) => {
    try {


      let respuesta = await contextAxios.post("/api/usuarios", datos);

      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data
      });

      //obtener informacion del usuario
      obtenerUsuario();
    } catch (error) {
      let alerta = {
        msg: error.response.data.msg,
        class: "alerta-error",
      };
    
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const obtenerUsuario = async () => {
    const token = localStorage.getItem("token");


    if (token) {

      authToken(token);      //funcion que envia el token por header

    }

    try {
      let respuesta = await contextAxios.get("/api/auth");

      localStorage.setItem("Usuario", JSON.stringify(respuesta.data.usuario))
      dispatch({
        type: OBTENER_USUARIOS,
        payload:  JSON.parse(localStorage.getItem("Usuario")),
      });
    } catch (error) {


      let alerta = {
        msg: error.response.data.msg,
        class: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const iniciarSesion = async (datos) => {
    try {
      let respuesta = await contextAxios.post("/api/auth", datos);


      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });

      obtenerUsuario();
    } catch (error) {


      let alerta = {
        msg: error.response.data.msg,
        class: "alerta-error",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const cerrarSesion = ()=>{

    dispatch({
      type: REGISTRO_ERROR
    });

    Router.push("/login");
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando:state.cargando,
        crearUsuarioBD,
        iniciarSesion,
        obtenerUsuario,
        cerrarSesion
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthState;
