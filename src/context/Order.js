import { createContext, useContext, useState, useEffect } from "react";
import { authContext } from "./Auth";
import { cartContext } from "./Cart";

import { DataStore } from "aws-amplify";
import { Pedido, Item } from "../models";

const OrderContext = createContext({});

export default function OrderContextProvider({ children }) {
  const { user } = authContext();
  const { delivery, total, basket, basketItens } = cartContext();

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    DataStore.query(Pedido, (pedido) => pedido.userID.eq(user.id)).then(setPedidos);
  }, [user]);

  async function createOrder() {
    // create the order
    const novoPedido = await DataStore.save(
      new Pedido({
        userID: user.id,
        Delivery: delivery,
        status: "NOVO",
        total: total,
      })
    );

    // add all basketDishes to the order
    await Promise.all(
      basketItens.map((basketItem) =>
        DataStore.save(
          new Itens({
            qtd: basketItem.qtd,
            pedidoID: novoPedido.id,
            Item: basketItens.Item,
          })
        )
      )
    );

    // delete basket
    await DataStore.delete(basket);
    setPedidos([...pedidos, novoPedido]);
    return newOrder;
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

export function orderContext() {
  return useContext(OrderContext);
}
