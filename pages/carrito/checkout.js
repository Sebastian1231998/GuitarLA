import React, { useState } from "react";
import Layout from "../../components/layout";
import Checkoutitem from "../../components/carrito/checkoutitem";



const checkout = () => {


   return (
    <Layout
    checkout={true}
    >
    <Checkoutitem />
    </Layout>
  );
};

export default checkout;
