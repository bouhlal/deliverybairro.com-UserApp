import { useState, useEffect, useContext, useMemo, createContext } from 'react';
import { useAuthContext} from './AuthContext';
import { DataStore } from 'aws-amplify';
import { Basket, BasketItem } from '../models';

const CartContext = createContext({});

export default function CartContextProvider({ children }) {
  const { dbUser } = useAuthContext();

  console.log("dbUser (src/context/Cart.js): ", dbUser);

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
      const baskets = await DataStore.query(Basket, (basket) => basket.userID.eq(dbUser.token));
      setBasket(baskets[0]);
    }
    fetchBasket();
  }, [dbUser]);

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
      new Basket({ userID: dbUser.token, deliveryID: delivery.id })
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
    <CartContext.Provider value={{ delivery, cart, total, GetDelivery, cleanCart, AddToCart, RemoveFromCart }}>
      { children }
    </CartContext.Provider>
  )
}

export const useCartContext = () => useContext(CartContext);

// export function useCartContext() {
//   useContext(CartContext);
// }
