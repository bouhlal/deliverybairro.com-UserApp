/**
 * index.js (src/context/OrderContext.js)
 */

import { useState, useEffect, useContext, createContext } from "react";
import { DataStore } from "aws-amplify";
import { Pedido, Item } from "../models";

import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export const OrderContext = createContext({});

function OrderContextProvider({ children }) {
  const { usr_token, dbUser } = useContext(AuthContext);
  const { delivery, total, cart, cartItens } = useContext(CartContext);
  const [pedidos, setPedidos] = useState([]);

  console.log("usr_token (OrderContext): ", usr_token);

  useEffect(() => {
    DataStore.query(Pedido, (pedido) => pedido.userID.eq(usr_token)).then(setPedidos);
  }, [dbUser]);

  async function createOrder() {
    // Create new Order by Delivery
    const pedido = await DataStore.save(
      new Pedido({
        userID: usr_token,
        Delivery: delivery,
        status: "NOVO",
        total: total,
      })
    );

    // Add all cartItens to the new Order
    await Promise.all(
      cartItens.map((cartItem) =>
        DataStore.save(
          new Itens({
            qtd: cartItem.qtd,
            pedidoID: pedido.id,
            Item: cartItem.Item,
          })
        )
      )
    );

    // Delete Cart
    await DataStore.delete(cart);
    setPedidos([...pedidos, pedido]);
    return pedido;
  };

  async function getOrder(id) {
    const pedido = await DataStore.query(Pedido, id);
    const pedidoItens = await DataStore.query(Item, (item) =>
      item.pedidoID.eq(id)
    );
    return { ...pedido, itens: pedidoItens };
  };

  return (
    <OrderContext.Provider value={{ pedidos, createOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
