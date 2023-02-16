import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, SafeAreaView, ActivityIndicator } from "react-native";
import { DataStore } from "aws-amplify";
import { Delivery, Produto } from "../../models";
import { cartContext } from "../../context/Cart";

import Header from "../../components/Header";
import DeliveryHeader from '../../components/Delivery/DeliveryHeader';
import DeliveryItemToSelect from '../../components/Delivery/DeliveryItemToSelect';
import DeliveryListItem from '../../components/Delivery/DeliveryListItem';

export default function DeliveryInfo({ route }) {
  const [show, showModal] = useState(false);

  const [delivery, setDelivery] = useState(null);
  const [listadeprodutos, setListaDeProdutos] = useState([]);
  const [produto, setProduto] = useState({});
  const [isAscending, setIsAscending] = useState(true);

  const id = route.params?.id; console.log('Delivery ID: ', id);

  const { setDelivery: setBasketDelivery } = cartContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketDelivery(null);
    DataStore.query(Delivery, id).then(setDelivery);
    DataStore.query(Produto, (produto) => produto.deliverys?.deliveryId.eq(id)).then(setListaDeProdutos);
  }, [id]);

  useEffect(() => {
    setBasketDelivery(delivery);
  }, [delivery]);

  function listByAZ() {
    const listaordenada = [...listadeprodutos].sort((a, b) => {
      if (a.nome < b.nome) { return isAscending ? -1 : 1 }
      if (a.nome > b.nome) { return isAscending ? 1 : -1 }
      return 0;
    });
    setListaDeProdutos(listaordenada);
    setIsAscending(!isAscending);
    console.log("Lista de Produtos (A..Z)", listadeprodutos);
  }

  if (!delivery) {
    return <ActivityIndicator size={"large"} color="#145E7D" />
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />
        <FlatList
          data={listadeprodutos}
          ListHeaderComponent={() => <DeliveryHeader delivery={delivery} listbyaz={()=>listByAZ()}/>}
          ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há produtos deste Delivery!</Text>}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <DeliveryListItem item={item} selectItem={()=>SelectItem(item)}/>}
        />
        <Modal animationType="slide" transparent={true} visible={show} >
          <DeliveryItemToSelect item={produto} fechar={()=>showModal(false)}/>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },
  flatlist: {
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    margin: 10,
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  }
});
