import { useState, useContext, createContext } from 'react';

export const CartContext = createContext({});

function CartConextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const [subtotal, setSubTotal] = useState(0);

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
    setCart(produtos => [...produtos, data]);
    setCartTotal([...cart, data])
  };

  async function RemoveFromCart(produto){
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
    let result = itens.reduce((acc, obj) => { return acc + obj.total}, 0)
    setSubTotal(result.toFixed(2));
  }

  async function cleanCart() {
    setCart([]);
    setSubTotal(0);
  }

  return(
    <CartContext.Provider 
      value={{ 
        cart, delivery, subtotal, 
        AddToCart, RemoveFromCart, cleanCart, 
        setDelivery
      }}
    >
      { children }
    </CartContext.Provider>
  )
}

export default CartConextProvider;


/**
------------------------------------------------------------------------------------
  const subtotal = basketItens.reduce(
    (sum, basketItem) => sum + basketItem.qtd * basketItem.Produto.vr_unitario,
    delivery?.taxa_entrega
  );

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
----------------------------------------------------------------------------------------
import { AuthContext } from './AuthContext';

// import { DataStore } from 'aws-amplify';
// import { Basket, BasketItem } from '../models';

  // const { dbUser } = useContext(AuthContext);
  // const [basket, setBasket] = useState(null);
  // const [basketItens, setBasketItens] = useState([]);

  // useEffect(() => {
  //   DataStore.query(Basket, (b) =>
  //     b.deliveryID.eq(delivery.id).userID.eq(dbUser.id)
  //   ).then((baskets) => setBasket(baskets[0]));
  // }, [dbUser, delivery]);

  // useEffect(() => {
  //   if (basket) {
  //     DataStore.query(BasketItem, (basketitens) => basketitens.basketID.eq(basket.id)).then(
  //       setBasketItens
  //     );
  //   }
  // }, [basket]);

  // get the existing basket or create a new one
  let current_cart = basket || (await createNewBasket());
  // create a new_item and save to Datastore
  const new_item = await DataStore.save(
    new BasketItem({ qtd: qtd, Item: produto, basketID: current_cart.id })
  );
  setBasketItens([...basketItens, new_item]);

  async function createNewBasket() {
    const new_basket = await DataStore.save(
      new Basket({ userID: dbUser.id, deliveryID: delivery.id })
    );
    setBasket(new_basket);
    return new_basket;
  };

  try {
    const itemToDelete = await DataStore.query(BasketItem, produto.id);
    await DataStore.delete(itemToDelete);
    setBasketItens(produtos => produtos.filter((item) => item.id !== produto.id));
  } catch (error) {
    console.log("Error: ", error.message);
  }

  try {
    if (basket) {
      const basketToDelete = await DataStore.query(Basket, basket.id);
      await DataStore.delete(basketToDelete);
    }
  } catch(error) {
    console.log("Error: ", error.message);
  }

**/
