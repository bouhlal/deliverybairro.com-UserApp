import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, Modal, SafeAreaView, ActivityIndicator } from "react-native";
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

  const id = route.params?.id; console.log('Delivery ID: ', id);

  const { setDelivery: setBasketDelivery } = cartContext();

  useEffect(() => {
    if (!id) {
      return;
    }
    setBasketDelivery(null);
    DataStore.query(Delivery, id).then(setDelivery);
    DataStore.query(Produto, (produto) => produto.deliverys?.deliveryId.eq(id)).then(setListaDeProdutos);
    // DataStore.query(Produto, (produto) => produto.deliveryID.eq(id)).then(setListaDeProdutos);
  }, [id]);

  useEffect(() => {
    setBasketDelivery(delivery);
  }, [delivery]);

  if (!delivery) {
    return <ActivityIndicator size={"large"} color="#145E7D" />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={show} >
        <DeliveryItemToSelect item={produto} fechar={()=>showModal(false)}/>
      </Modal>
      <Header />
      <FlatList
        data={listadeprodutos}
        ListHeaderComponent={() => <DeliveryHeader delivery={delivery} />}
        ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há produtos deste Delivery!</Text>}
        keyExtractor={(item) => item.nome}
        renderItem={({item}) => <DeliveryListItem item={item} selectItem={()=>SelectItem(item)}/>}
      />
    </SafeAreaView>
/*
    <SafeAreaView style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={show} >
        <DeliveryItemToSelect item={produto} fechar={showModal(false)}/>
      </Modal>
      <Header />
      <FlatList
        data={listadeprodutos}
        ListHeaderComponent={() => <DeliveryHeader delivery={delivery} />}
        ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há produtos deste Delivery!</Text>}
        keyExtractor={(produto) => produto.id}
        renderItem={({produto}) => <DeliveryListItem item={produto} selectItem={SelectItem(produto)}/>}
      />
    </SafeAreaView>
**/

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    padding: 10
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

/*
  const [delivery, setDelivery] = useState(null);
  const [listadeprodutos, setListaDeProdutos] = useState([]);
  const [produto, setProduto] = useState({});
  const [show, showModal] = useState(false);

  const id = route.params?.id;
  console.warn("Delivery ID: ", id);

  useEffect(() => {
    (async function() {
      try {
        DataStore.query(Delivery, id).then(setDelivery);
        DataStore.query(Produto, (produto) => produto.deliverys?.deliveryId.eq(id)).then(setListaDeProdutos);
        console.log("Lista de Produtos: ", listadeprodutos);
      } catch(error) {
        console.error("Error (query: Delivery): ", error);
      }
    })();
  }, [route.params?.id]);

  async function SelectItem({ item }) {
    setProduto(item); 
    showModal(true);
  }

**/
