export function formatearFecha(fecha) {
  const fechaFormateada = new Date(fecha);

  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  return fechaFormateada.toLocaleDateString("es-ES", options);
}

export function obtieneIniciales(nombre) {
  if (nombre !== undefined) {
    let exp = /(^\w)\w+\s+(\w)/;
    let iniciales = exp.exec(nombre);
    let concatenaIniciales = `${iniciales[1]}${iniciales[2]}`;
    return concatenaIniciales;
  } else {
    return null;
  }
}

export function obtieneFiltroCarrito() {

  let filtro;
  let usuario = JSON.parse(localStorage.getItem("Usuario"));

  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (carrito && usuario) {

  
    filtro = carrito.filter((carro) => carro.correo == usuario.email);
  }

  return filtro
}

export function eliminaCarrito() {

  let filtro;
  let usuario = JSON.parse(localStorage.getItem("Usuario"));

  let carrito = JSON.parse(localStorage.getItem("carrito"));

  if (carrito && usuario) {

  
    filtro = carrito.filter((carro) => carro.correo !== usuario.email);
  }

  return filtro
}
