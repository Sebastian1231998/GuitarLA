import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Router from "next/router";
import { obtieneIniciales, formatearFecha } from "../helpers";
import styles from "../styles/Profile.module.css";

import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Slide,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = ({ orders }) => {
  let [usuario, setUsuario] = useState({});
  const [ordersUser, setOrdersUser] = useState([]);
  const [open, setOpen] = useState(false);
  const [order_modal, setOrderModal] = useState({});

  const handleClickOpen = (orderitem) => {
    setOpen(true);

    console.log(orderitem);
    setOrderModal(orderitem);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const orangeTheme = createTheme({
    palette: {
      primary: {
        main: "#ffa726",
      },
      secondary: pink,
    },
  });

  const filtraOrders = () => {
    let usuarioEffect = JSON.parse(localStorage.getItem("Usuario"));
    let ordenes = orders.orden.filter(
      (order) => order.email_user === usuarioEffect.email
    );
    return ordenes;
  };

  console.log(ordersUser);

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) {
      Router.push("/");
      return;
    }

    let usuarioEffect = JSON.parse(localStorage.getItem("Usuario"));
    setUsuario(usuarioEffect);
    setOrdersUser(filtraOrders());
  }, []);

  console.log(usuario);

  let iniciales = obtieneIniciales(usuario.nombre);

  return (
    <>
      <Layout checkout={true}>
        <div className="contenedor">
          <div className={styles.sidebar_perfil}>
            <div className={styles.contenido_informacion}>
              <div className={styles.flex_line}>
                <div className={styles.avatar}>
                  <span>{iniciales ? iniciales.toUpperCase() : "USER"}</span>
                </div>
                <div className={styles.line_vertical}></div>

                <div className={styles.lista_opciones}>
                  <ul className={styles.order_ul}>
                    <li className={styles.opcion}>Orders</li>
                  </ul>
                </div>
              </div>

              <div className={styles.line}></div>

              <div className={styles.informacion_usuario}>
                <h3>{usuario.nombre}</h3>
                <p>
                  <span>Correo:</span>
                  {usuario.email}
                </p>
                <p>Registro app: {formatearFecha(usuario.registro)}</p>
                <p>ID Usuario: {usuario._id}</p>
                <hr />

                <div className={styles.orden}>
                  <h3>Orders</h3>

                  <table className={styles.table}>
                    <thead className={styles.thead}>
                      <tr>
                        <th>order_id</th>
                        <th>direccion destino</th>
                        <th>email_payer</th>
                        <th>status</th>
                        <th>registro</th>
                        <th>cuidad</th>
                        <th>country_code</th>
                        <th>Ver</th>
                      </tr>
                    </thead>
                    <tbody className={styles.tbody}>
                      {ordersUser.map((order) => (
                        <>
                          <tr key={order._id}>
                            <td>{order.id_transaction_paypal}</td>
                            <td>{order.address}</td>
                            <td>{order.email_address}</td>
                            <td>{order.status}</td>
                            <td>{formatearFecha(order.registro)}</td>
                            <td>{order.cuidad}</td>
                            <td>{order.country_code}</td>

                            <td>
                              <Button
                                variant="outlined"
                                onClick={() => {
                                  handleClickOpen(order);
                                }}
                              >
                                <VisibilityIcon />
                              </Button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <ThemeProvider theme={orangeTheme}>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                OrderId: {order_modal.id_transaction_paypal}
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>

        <List>
          {Object.keys(order_modal).length > 0 &&
            order_modal.items.map((item) => (
              <>
                <ListItem button>
                  <img
                    src={item.imagen}
                    className={styles.imagen_modal}
                    width={130}
                    height={170}
                    alt="imagen_item"
                  />
                  <ListItemText primary={item.titulo} />
                  <ListItemText
                    className={styles.descripcion}
                    primary={item.descripcion}
                  />
                  <ListItemText
                    className={styles.precio}
                    primary={`$${item.precio}`}
                  />
                </ListItem>
                <Divider />
              </>
            ))}
        </List>

        <h2 className="heading">Information Order</h2>

        <div
          className={`${styles.contenido_order} ${styles.informacion_usuario}`}
        >
          <div className="contenedor" style={{ padding: "0 2rem " }}>
            <div className={styles.border_item}>
              <p>
                <span className={styles.key}>Direccion de entrega:</span>
                {order_modal.address}
              </p>
            </div>
            <div className={styles.border_item}>
              <p>
                <span className={styles.key}>Nombre de cliente:</span>
                {usuario.nombre}
              </p>
            </div>
            <div className={styles.border_item}>
              <p>
                <span className={styles.key}>Correo del usuario:</span>
                {order_modal.email_user}
              </p>
            </div>
          </div>
          <div className="">
            <div className={styles.border_item}>
              <p>
                <span className={styles.key}>Creacion Orden:</span>
                {formatearFecha(order_modal.registro)}
              </p>
            </div>
            <div className={styles.border_item}>
              <p>
                <span className={styles.key}>Status:</span>
                {order_modal.status}
              </p>
            </div>
          </div>
        </div>

        
      </Dialog>
    </>
  );
};

export async function getServerSideProps() {
  const url = `http://localhost:4000/api/pagos`;

  const respuesta = await fetch(url);
  let orders = await respuesta.json();

  console.log(orders);

  return {
    props: {
      orders,
    },
  };
}

export default Profile;
