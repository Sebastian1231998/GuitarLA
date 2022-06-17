import { useContext, useEffect } from "react";
import styles from "../styles/Login.module.css";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import alertaContext from "../context/alertas/alertaContext";
import * as Yup from "yup";
import Alerta from "./alerta";
import Router from "next/router";

const LoginComponent = () => {
  const authShchema = Yup.object().shape({
    email: Yup.string()
      .email("no es un email valido")
      .required("El campo es obligatorio"),
    password: Yup.string().required("El campo es obligatorio"),
  });

  const iniciarSesionComponent = (valores) => {
    iniciarSesion({
      email: valores.email,
      password: valores.password,
    });
  };

  let authcontext = useContext(authContext);
  let { autenticado, mensaje, iniciarSesion } = authcontext;

  let alertacontext = useContext(alertaContext);
  let { alerta, mostrarAlerta } = alertacontext;

  useEffect(() => {
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.class);
    }

    let token = localStorage.getItem("token");

    if (token && token != "undefined") {
      Router.push("/");
    }
    // eslint-disable-next-line
  }, [autenticado, mensaje]);

  return (
    <div className={styles.backgroundLogin}>
      <div className={styles.backgroundform}>
        {alerta ? <Alerta 
        classAlert="error"
        >{alerta.msg}</Alerta> : null}
        <Formik
          onSubmit={iniciarSesionComponent}
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={authShchema}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <h2>Inicio Sesión</h2>
                <div className={styles.flexcampos}>
                  <label>Correo: </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Escribe tu Correo"
                  />
                </div>

                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
                <div className={styles.flexcampos}>
                  <label>Password: </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Escribe tu Password"
                  />
                </div>

                {errors.password && touched.password ? (
                  <Alerta>{errors.password}</Alerta>
                ) : null}

                <Field type="submit" value="Enviar" />

                <Link href="crear-cuenta">Crear Cuenta</Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginComponent;
