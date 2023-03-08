import { useState, useEffect, useContext, createContext } from "react";
import { DataStore } from "aws-amplify";
import { Pedido, Item } from "../models";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export const OrderContext = createContext({});

function OrderContextProvider({ children }) {
  const { usr_token, dbUser } = useContext(AuthContext);
  const { delivery, total, basket, basketItens } = useContext(CartContext);

  console.log("usr_token (OrderContext): ", usr_token);

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    DataStore.query(Pedido, (pedido) => pedido.userID.eq(usr_token)).then(setPedidos);
  }, [dbUser]);

  async function createOrder() {
    // Create new Order by Delivery
    const novoPedido = await DataStore.save(
      new Pedido({
        userID: usr_token,
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

export default OrderContextProvider;
