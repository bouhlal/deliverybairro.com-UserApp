/**
 * index.js (src/pages/CartInfo/index.js) 
 */

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import { CartContext } from '../../contexts/CartContext';
import { OrderContext } from '../../contexts/OrderContext';
import { useNavigation } from '@react-navigation/native';

import CartItemList from '../../components/Cart';

// exibe o Carrinho de Compras e permite enviar/gerar o Pedido (Order) através da função createOrder()

export default function CartInfo() {
  const { delivery, cart, cartItens, subtotal, total, AddToCart, RemoveFromCart, cleanCart } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);

  const navigation = useNavigation();

  async function gerarPedidoELimparCestaDeCompras() {
    const novoPedido = await createOrder();
    await cleanCart();
    navigation.navigate("Pedidos", {
      screen: "Pedidos",
      params: { id: novoPedido.id },
    });
  };

  async function cancelarPedidoELimparCestaDeCompras() {
    await cleanCart();
    navigation.goBack();
  }
 
  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', width: '100%'}}>
          <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{delivery?.nome}</Text>
          <Text style={{ fontSize: 13}}>{delivery?.horario}</Text>
          <Text style={{ fontSize: 13}}><Fontisto color="#FF0000" name='map-marker-alt' size={18}/> {delivery?.latitude}, {delivery?.longitude}</Text>
          <Text style={{ fontSize: 13, marginBottom: 10}}>Valor da Taxa de Entrega: R$ {delivery?.taxa_entrega.toFixed(2)}</Text>
          <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>Seus Pedidos</Text>
        </View>
      </View>

      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=>String(item.id)}
        ListEmptyComponent={() => <Text style={styles.empty}>Cesta de Compras vazia!</Text>}
        renderItem={({item})=>(
          <CartItemList
            produto={item}
            AddQtd={() => AddToCart(item, 1, item.vr_unitario)}
            RemoveQtd={() => RemoveFromCart(item)}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.subtotal}>Sub-Total: R$ {parseFloat(subtotal).toFixed(2)}</Text>
            <Text style={styles.taxa}>Taxa de Entrega: R$ {parseFloat(delivery?.taxa_entrega).toFixed(2)}</Text>
            <Text style={styles.total}>Total: R$ {parseFloat(total).toFixed(2)}</Text>
          </View>
        )}
      />

      {
        (cart.length > 0) &&
        <TouchableOpacity style={styles.btnAdd} onPress={()=>gerarPedidoELimparCestaDeCompras()}>
          <Text style={{color: '#FFF', fontSize: 18}}>Enviar Pedido</Text>
        </TouchableOpacity>
      }
        <TouchableOpacity style={styles.btnCancel} onPress={()=>cancelarPedidoELimparCestaDeCompras()}>
          <Text style={{color: '#FFF', fontSize: 18}}>CANCELAR</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },
  subtotal:{
    fontSize: 18,
    marginTop: 20
  }, 
  taxa:{
    fontSize: 18,
  },
  total:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnAdd: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#145E7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnCancel: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  imagem:{
    width: 75, 
    height: 75,
  },
})

// useEffect(() => {
//   let soma = parseFloat(subtotal) + parseFloat(delivery.taxa_entrega);
//   setTotal(soma);
// }, [subtotal]);
