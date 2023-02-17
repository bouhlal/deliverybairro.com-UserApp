import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { cartContext } from '../../context/Cart';

import CardItem from '../../components/Cart';

export default function CartInfo() {
  const navigation = useNavigation();
  const { delivery, cart, subtotal, cleanCart } = cartContext();
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    let soma = parseFloat(subtotal) + parseFloat(delivery.taxa_entrega);
    setTotal(soma);
  }, [subtotal]);

  async function EnviarPedido() {
    Alert.alert("Envia pedido para o Delivery, e limpa a Cesta de Compras...")
    await cleanCart();
    GoToLink("Pedidos");
  }

  async function CancelarPedido() {
    Alert.alert("Cancela pedido e limpa a Cesta de Compras...")
    await cleanCart();
    navigation.goBack();
  }

  function GoToLink(link) {
    return (
      navigation.navigate(link)
    )
  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', width: '100%'}}>
          <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{delivery?.nome}</Text>
          <Text style={{ fontSize: 13}}>{delivery?.horario}</Text>
          <Text style={{ fontSize: 13}}><Fontisto color="#FF0000" name='map-marker-alt' size={18}/> {delivery?.endereco.endereco}, {delivery?.endereco.bairro}</Text>
          <Text style={{ fontSize: 13, marginBottom: 10}}>Valor da Taxa de Entrega: R$ {delivery?.taxa_entrega.toFixed(2)}</Text>
        </View>
      </View>

      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item)=>String(item.id)}
        ListEmptyComponent={() => <Text style={styles.empty}>Cesta de Compras vazia!</Text>}
        renderItem={({item})=>(
          <CardItem
            data={item}
            AddQtd={() => AddToCart(item, 1, item.vr_unitario)}
            RemoveQtd={() => RemoveFromCart(item)}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.subtotal}>Sub-Total: R$ {parseFloat(subtotal).toFixed(2)}</Text>
            <Text style={styles.taxa}>Taxa de Entrega: R$ {parseFloat(delivery.taxa_entrega).toFixed(2)}</Text>
            <Text style={styles.total}>Total: R$ {parseFloat(total).toFixed(2)}</Text>
          </View>
        )}
      />

      {
        (cart.length > 0) &&
        <TouchableOpacity style={styles.btnAdd} onPress={()=>EnviarPedido()}>
          <Text style={{color: '#FFF', fontSize: 18}}>Enviar Pedido</Text>
        </TouchableOpacity>
      }
        <TouchableOpacity style={styles.btnCancel} onPress={()=>CancelarPedido()}>
          <Text style={{color: '#FFF', fontSize: 18}}>Cancelar Pedido</Text>
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


/*
import { View, Text, StyleSheet} from 'react-native';
import { authContext } from '../../context/Auth';

import Header from '../../components/Header';

export default function CartInfo() { 
  const { user } = authContext();

  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text>Minhas Compras (Cart)</Text>
        <Text>{user.email}</Text>
        <Text>{user.token}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: "#FFF",
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

*/