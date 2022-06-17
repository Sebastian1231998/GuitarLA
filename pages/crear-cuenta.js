import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import { Formik, Form, Field } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import Alerta from "../components/alerta";
const CrearCuenta = () => {
  let [alertaPassword, mostrarAlerta] = useState(false);
  const clienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(5, "El Nombre es muy corto")
      .max(30, "El Nombre es muy largo")
      .required("El campo es obligatorio"),
    correo: Yup.string()
      .email("Email no valido")
      .required("el campo es oblitatorio"),
    password: Yup.string()
      .min(6, "El Password es muy corto")
      .required("campo es obligatorio"),
    confirmar_password: Yup.string()
      .min(6, "El Password es muy corto")
      .required("campo es obligatorio"),
  });

  const handleSubmit = (valores) => {
  
    if (valores.password !== valores.confirmar_password) {
      mostrarAlerta(true);
      return;
    }
    mostrarAlerta(false);
  };

  return (
    <div className={styles.backgroundLogin}>
      <div className={styles.backgroundform}>
        {alertaPassword ? <Alerta>Password no coincide</Alerta> : null}
        <Formik
          initialValues={{
            nombre: "",
            correo: "",
            password: "",
            confirmar_password: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={clienteSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form>
                <h2>Crear Cuenta</h2>

                <div className={styles.flexcampos}>
                  <label>Nombre: </label>
                  <Field
                    type="text"
                    placeholder="Escribe tu Nombre"
                    name="nombre"
                    id="nombre"
                  />
                </div>

                {errors.nombre && touched.nombre ? (
                  <Alerta
                    classAlert="error"
                  >{errors.nombre}</Alerta>
                ) : null}
                <div className={styles.flexcampos}>
                  <label>Correo: </label>
                  <Field
                    type="email"
                    placeholder="Escribe tu Correo"
                    name="correo"
                    id="correo"
                  />
                </div>

                {errors.correo && touched.correo ? (
                  <Alerta
                   classAlert="error"
                  >{errors.correo}</Alerta>
                ) : null}
                <div className={styles.flexcampos}>
                  <label>Password: </label>
                  <Field
                    type="password"
                    placeholder="Escribe tu Password"
                    name="password"
                    id="password"
                  />
                </div>
                {errors.password && touched.password ? (
                  <Alerta
                   classAlert="error"
                  >{errors.password}</Alerta>
                ) : null}
                <div className={styles.flexcampos}>
                  <label>Confirma Password: </label>
                  <Field
                    type="password"
                    placeholder="Confirma tu Password"
                    name="confirmar_password"
                    id="confirmar_password"
                  />
                </div>
                {errors.confirmar_password && touched.confirmar_password ? (
                  <Alerta
                    classAlert="error"
                  >{errors.confirmar_password}</Alerta>
                ) : null}

                <Field type="submit" value="Enviar" />

                <Link href="/login">Inicio Sesión</Link>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default CrearCuenta;
