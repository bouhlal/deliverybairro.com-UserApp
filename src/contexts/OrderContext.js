import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { useCartContext } from "./CartContext";

import { DataStore } from "aws-amplify";
import { Pedido, Item } from "../models";

const OrderContext = createContext({});

export default function OrderContextProvider({ children }) {
  const { dbUser } = useAuthContext();
  const { delivery, total, basket, basketItens } = useCartContext();

  console.log("dbUser (src/context/Order.js): ", dbUser);

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    DataStore.query(Pedido, (pedido) => pedido.userID.eq(dbUser.token)).then(setPedidos);
  }, [dbUser]);

  async function createOrder() {
    // Create new Order by Delivery
    const novoPedido = await DataStore.save(
      new Pedido({
        userID: dbUser.token,
        Delivery: delivery,
        status: "NOVO",
        total: total,
      })
    );

    // Add all basketItens to the new Order
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

    // Delete Basket
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

export const useOrderContext = () => useContext(OrderContext);

// export function useOrderContext() {
//   useContext(OrderContext);
// }
