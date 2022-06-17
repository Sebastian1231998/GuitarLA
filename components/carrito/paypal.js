import React, { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import {eliminaCarrito, obtieneFiltroCarrito} from "../../helpers/"
const Paypal = ({precioPagar, setMuestraCompra,setIdTransaccion}) => {

    let [token, setToken] = useState("");
   

    useEffect(()=>{

        let tokenEffect = localStorage.getItem("token");

        if (!token && token === "undefined") {
          Router.push("/");
        }

        setToken(tokenEffect)

      

    }, [])


    const  guardaTransaccion = async(transaccion)=>{

        let usuario = JSON.parse(localStorage.getItem("Usuario"))
        transaccion.email_user = usuario.email;
        console.log(transaccion)
        let respuesta = await fetch(`http://localhost:4000/api/pagos`, {
        method: "POST",
        headers:{
            'x-auth-token': token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaccion)
      });
      console.log(respuesta)

      localStorage.setItem("carrito", JSON.stringify(eliminaCarrito()))
    }
  return (
    <PayPalButton

options={{
          clientId: "AbwWRIcx2F-Udf10WSkhj_dP1rq9ICnn_TKRi4rgBVo5bkloTkgPCyy9DSlkm5ROEH72XxW7w7Px1iGy",
          currency:"USD"
        }}
    amount={precioPagar}
    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
    onSuccess={ (details, data) => {
    
      setMuestraCompra(true)

   

      setIdTransaccion(details.id)
 
       let objTransaction = {

          address:details.purchase_units[0].shipping.address.address_line_1,
          country_code:details.purchase_units[0].shipping.address.country_code,
          cuidad: details.purchase_units[0].shipping.address.admin_area_2,
          email_address: details.payer.email_address,
          status:details.status,
          id_transaction_paypal: details.id,
          registro: details.create_time,
          items: obtieneFiltroCarrito()
       }
       guardaTransaccion(objTransaction)
   
    }}
  />

  );
};

export default Paypal;
