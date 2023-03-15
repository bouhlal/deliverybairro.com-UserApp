/**
 * index.js (src/context/CartContext.js)
 */

import { useState, useEffect, createContext, useContext } from 'react';
import { DataStore } from 'aws-amplify';
import { Cart, CartItem, Produto } from "../models";
import { AuthContext } from './AuthContext';

export const CartContext = createContext({});

function CartContextProvider({ children }) {
  const { dbUser } = useContext(AuthContext);

  const [delivery, setDelivery] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartItens, setCartItens] = useState([]);
  const [total, setTotal] = useState(0);

  const subtotal = cartItens.reduce (
    (sum, cartItem) => sum + cartItem.qtd * cartItem.Produto.vr_unitario,
    delivery?.taxa_entrega
  );

  const id = dbUser.id;

  useEffect(() => {
    DataStore.query(Cart, (basket) =>
      basket.deliveryID.eq(delivery.id).userID.eq(id)).then((baskets) => setCart(baskets[0])
    );
  }, [dbUser, delivery]);

  useEffect(() => {
    if (cart) {
      DataStore.query(CartItem, (basketdish) => basketdish.cartID.eq(cart.id)).then(
        setCartItens
      );
    }
  }, [cart]);

  async function addItemToCart(item, quantity) {
    // get the existing basket or create a new one
    let myCart = cart || (await createNewCart());
    // create a BasketDish item and save to Datastore
    const newItem = await DataStore.save(
      new CartItem({ qtd: quantity, Item: item, cartID: myCart.id })
    );
    setCartItens([...cartItens, newItem]);
  };

  async function createNewCart() {
    const newCart = await DataStore.save(
      new Cart({ userID: dbUser.id, deliveryID: delivery.id })
    );
    setCart(newCart);
    return newCart;
  };

  async function AddToCart(newItem, qtd, total) {
    console.log(newItem);
    const i = cart.findIndex(item => item.id === newItem.id);
    if(i !== -1){
      let cList = cart;
      cList[i].qtd = cList[i].qtd +qtd;
      cList[i].total  = cList[i].total +total;
      setCart(cList);
      setCartTotal(cList);
      return;
    }
    let data = {
      ...newItem,
      qtd: qtd,
      total: total
    }
    setCart(itens => [...itens, data]);
    setCartTotal([...cart, data])
  };

  async function RemoveFromCart(produto)  {
    const i = cart.findIndex(item => item.id === produto.id);
    if (cart[i]?.qtd >1) {
      let cList = cart;
      cList[i].qtd = cList[i].qtd -1;
      cList[i].total = cList[i].total - cList[i].vr_unitario;
      setCart(cList);
      setCartTotal(cList);
      return;
    }
    const newList = cart.filter(item => item.id !== produto.id);
    setCart(newList);
    setCartTotal(newList);
  }

  function setCartTotal(itens) {
    let result = itens.reduce((acc, obj) => { return acc + obj.total}, delivery?.taxa_entrega);
    setTotal(result.toFixed(2));
  }

  async function cleanCart() {
    setCart([]);
    setTotal(0);
  }

  return(
    <CartContext.Provider 
      value={{ 
        delivery, cart, cartItens, subtotal, total,
        AddToCart, RemoveFromCart, cleanCart, 
        addItemToCart, setDelivery
      }}
    >
      { children }
    </CartContext.Provider>
  )
}

export default CartContextProvider;
