import React, { useState, useEffect, createContext, useContext } from 'react';
import { authContext } from './Auth';

import { DataStore } from 'aws-amplify';
import { Basket, BasketItem } from '../models';

const CartContext = createContext({});

export default function CartProvider({ children }) {
  const { user } = authContext();
  
  const [basket, setBasket] = useState(null);
  const [basketItens, setBasketItens] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  console.log("User: ", user);

  useEffect(() => {
    DataStore.query(
      Basket, (basket) => basket.clienteID.eq(user.id)).then((baskets) => setBasket(baskets[0])
    );
  }, [user, delivery]); 

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketItem, (itens) => itens.basketID.eq(basket.id)).then(setBasketItens);
    }
  }, [basket]);

  async function AddToCart(delivery, new_item, qty, total) {
    console.log(new_item);
    const i = cart.findIndex(item => item.produtoID === new_item.produtoID);
    if(i !== -1){
      let cList = cart;
      cList[i].qtd = cList[i].qtd +qty;
      cList[i].total  = cList[i].total +total;
      setCart(cList);
      setCartTotal(cList);
      return;
    }
    let data = {
      ...new_item,
      qtd: qty,
      total: total
    }
    setCart(itens => [...itens, data]);
    setCartTotal([...cart, data]);

    let CurrentBasket = basket || (await CreateNewBasket({delivery: delivery}));
    const NewItem = await DataStore.save(
      new BasketItem({ qty, Item: new_item, basketID: CurrentBasket.id })
    );
    setBasketItens([...basketItens, NewItem]);
  }

  async function CreateNewBasket({delivery}) {
    const NewBasket = await DataStore.save(
      new Basket({ userID: user.id, deliveryID: delivery.id })
    );
    setBasket(NewBasket);
    return NewBasket;
  };

  async function RemoveFromCart(item_selected){
    const i = cart.findIndex(item => item.id === item_selected.id);
    if (cart[i]?.qtd >1) {
      let cList = cart;
      cList[i].qtd = cList[i].qtd -1;
      cList[i].total = cList[i].total - cList[i].vr_unitario;
      setCart(cList);
      setCartTotal(cList);
      return;
    }
    const newList = cart.filter(item => item.id !== item_selected.id);
    setCart(newList);
    setCartTotal(newList);
    // testar ou desabilitar as linhas abaixo
    const ItemToDelete = await DataStore.query(BasketItem, item_selected.id);
    DataStore.delete(ItemToDelete);
  }

  function setCartTotal(items) {
    // let basket = items;
    let result = items.reduce((soma, item) => { return soma + item.total}, 0)
    setSubTotal(result.toFixed(2));
  }

  async function cleanCart() {
    setCart([]);
    setSubTotal(0);
    // testar ou desabilitar as linhas abaixo
    const BasketToDelete = await DataStore.query(Basket, basket.id);
    DataStore.delete(BasketToDelete);
  }

  return(
    <CartContext.Provider 
      value={{
        cart, basket, basketItens, subtotal,
        setDelivery, cleanCart, AddToCart, RemoveFromCart
      }}
    >
      { children }
    </CartContext.Provider>
  )
}

export function cartContext() {
  return useContext(CartContext);
}
