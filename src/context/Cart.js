import { useState, useEffect, useContext, useMemo, createContext } from 'react';
import { authContext } from './Auth';
import { DataStore } from 'aws-amplify';
import { Basket, BasketItem } from '../models';

const CartContext = createContext({});

export default function CartProvider({ children }) {
  const { user } = authContext();

  const [basket, setBasket] = useState(null);
  const [basketItems, setBasketItems] = useState([]);
  const [delivery, setDelivery] = useState(null);
  const [cart, setCart] = useState([]);
  
  const total = useMemo(() => {
    if (!cart.length) return 0;
    return cart.reduce((soma, item) => soma + item.total, 0).toFixed(2);
  }, [cart]);
  
  useEffect(() => {
    async function fetchBasket() {
      const baskets = await DataStore.query(Basket, (basket) => basket.clienteID.eq(user.uid));
      setBasket(baskets[0]);
    }
    fetchBasket();
  }, [user]);

  useEffect(() => {
    async function fetchBasketItems() {
      if (basket) {
        const items = await DataStore.query(BasketItem, (item) => item.basketID.eq(basket.id));
        setBasketItems(items);
      }
    }
    fetchBasketItems();
  }, [basket]);

  async function AddToCart(newItem, qty, total) {
    const itemIndex = cart.findIndex((item) => item.produtoID === newItem.produtoID);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].qtd += qty;
      updatedCart[itemIndex].total += total;
      setCart(updatedCart);
    } else {
      const newItemWithQtyAndTotal = { ...newItem, qtd: qty, total };
      setCart([...cart, newItemWithQtyAndTotal]);
    }

    let currentBasket = basket || (await createNewBasket({ delivery }));
    const newBasketItem = await DataStore.save(new BasketItem({ qty, Item: newItem, basketID: currentBasket.id }));
    setBasketItems([...basketItems, newBasketItem]);
  }

  async function createNewBasket({ delivery }) {
    const newBasket = await DataStore.save(
      new Basket({ userID: user.id, deliveryID: delivery.id })
    );
    setBasket(newBasket => newBasket || newBasket);
    return newBasket;
  }

  async function RemoveFromCart(selectedItem) {
    const itemIndex = cart.findIndex((item) => item.id === selectedItem.id);
    if (cart[itemIndex].qtd > 1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex].qtd -= 1;
      updatedCart[itemIndex].total -= updatedCart[itemIndex].vr_unitario;
      setCart(updatedCart);
    } else {
      const newCart = cart.filter((item) => item.id !== selectedItem.id);
      setCart(newCart);
      try {
        const itemToDelete = await DataStore.query(BasketItem, selectedItem.id);
        await DataStore.delete(itemToDelete);
        setBasketItems(basketItems => basketItems.filter((item) => item.id !== selectedItem.id));
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  }

  async function cleanCart() {
    setCart([]);
    setTotal(null);
    try {
      if (basket) {
        const basketToDelete = await DataStore.query(Basket, basket.id);
        await DataStore.delete(basketToDelete);
      }
    } catch(error) {
      console.log("Error: ", error.message);
    }
  }


  function GetDelivery(delivery) {
    setDelivery(delivery)
  }

  return(
    <CartContext.Provider 
      value={{
        delivery, cart, total, 
        GetDelivery, cleanCart, AddToCart, RemoveFromCart
      }}
    >
      { children }
    </CartContext.Provider>
  )
}

export function cartContext() {
  return useContext(CartContext);
}

// const [total, setTotal] = useState(0);

// useEffect(() => {
//   async function updateCartTotal(items) {
//     const total = await items.reduce((soma, item) => soma + item.total, 0);
//     setTotal(total.toFixed(2));
//   }
//   updateCartTotal(cart);
// }, [cart]);

// async function createNewBasket({ delivery }) {
//   const newBasket = await DataStore.save(new Basket({ userID: user.id, deliveryID: delivery.id }));
//   setBasket(newBasket);
//   return newBasket;
// }

// async function RemoveFromCart(selectedItem) {
//   const itemIndex = cart.findIndex((item) => item.id === selectedItem.id);
//   if (cart[itemIndex].qtd > 1) {
//     const updatedCart = [...cart];
//     updatedCart[itemIndex].qtd -= 1;
//     updatedCart[itemIndex].total -= updatedCart[itemIndex].vr_unitario;
//     setCart(updatedCart);
//   } else {
//     const newCart = cart.filter((item) => item.id !== selectedItem.id);
//     setCart(newCart);
//     try {
//       const itemToDelete = await DataStore.query(BasketItem, selectedItem.id);
//       DataStore.delete(itemToDelete);
//     } catch (error) {
//       console.log("Error: ", error.message);
//     }
//   }
// }

// async function cleanCart() {
//   setCart([]);
//   setTotal(0);
//   try {
//     const basketToDelete = await DataStore.query(Basket, basket.id);
//     DataStore.delete(basketToDelete);
//   } catch(error) {
//     console.log("Error: ", error.message);
//   }
// }

/*
import React, { useState, useEffect, createContext, useContext } from 'react';
import { authContext } from './Auth';

import { DataStore } from 'aws-amplify';
import { Basket, BasketItem } from '../models';

const CartContext = createContext({});

export default function CartProvider({ children }) {
  const { user } = authContext();
  
  const [basket, setBasket] = useState(null);
  const [basketItens, setBasketItens] = useState([]);
  const [delivery, setDelivery] = useState(null);
  const [cart, setCart] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

  console.log("User: ", user);

  useEffect(() => {
    DataStore.query(
      Basket, (basket) => basket.clienteID.eq(user.uid)).then((baskets) => setBasket(baskets[0])
    );
  }, [user, delivery]); 

  useEffect(() => {
    if (basket) {
      DataStore.query(BasketItem, (itens) => itens.basketID.eq(basket.id)).then(setBasketItens);
    }
  }, [basket]);

  async function AddToCart(new_item, qty, total) {
    console.log("Item adicionado à Cesta:", new_item, qty, total);
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
    try {
      const ItemToDelete = await DataStore.query(BasketItem, item_selected.id);
      DataStore.delete(ItemToDelete);
    } catch(error) {
      console.log("Error: ", error.message);
    }
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
    try {
      const BasketToDelete = await DataStore.query(Basket, basket.id);
      DataStore.delete(BasketToDelete);
    } catch(error) {
      console.log("Error: ", error.message);
    }
  }

  function GetDelivery(dlvry) {
    setDelivery(dlvry)
  }

  return(
    <CartContext.Provider 
      value={{
        delivery, cart, subtotal, 
        GetDelivery, cleanCart, AddToCart, RemoveFromCart
      }}
    >
      { children }
    </CartContext.Provider>
  )
}

export function cartContext() {
  return useContext(CartContext);
}
**/