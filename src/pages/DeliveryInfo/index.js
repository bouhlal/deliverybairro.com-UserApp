import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, SafeAreaView, ActivityIndicator } from "react-native";
import { DataStore } from "aws-amplify";
import { Delivery, Produto } from "../../models";
import { CartContext } from '../../contexts/CartContext';

import Header from "../../components/Header";

import DeliveryHeader from '../../components/Delivery/DeliveryHeader';
import DeliveryItemToSelect from '../../components/Delivery/DeliveryItemToSelect';
import DeliveryListItem from '../../components/Delivery/DeliveryListItem';

export default function DeliveryInfo({ route }) {
  const { delivery, setDelivery } = useContext(CartContext);

  const [show, showModal] = useState(false);
  const [listaDeProdutos, setListaDeProdutos] = useState([]);
  const [produto, setProduto] = useState({});
  const [isAscending, setIsAscending] = useState(true);

  const id = route.params?.id; console.log('Delivery ID: ', id);

  useEffect(() => {
    if (!id) {
      return;
    }
    DataStore.query(Delivery, id).then(setDelivery);
    DataStore.query(Produto, (produto) => produto.deliverys?.deliveryId.eq(id)).then(setListaDeProdutos);
  }, [id]);

  function listByAZ() {
    const listaordenada = [...listaDeProdutos].sort((a, b) => (
      isAscending ? a.nome.localeCompare(b.nome) : b.nome.localeCompare(a.nome)
    ));
    setListaDeProdutos(listaordenada);
    setIsAscending(!isAscending);
  }
  
  async function handleSelectItem(item) {
    setProduto(item);
    showModal(true);
  }

  async function handleCloseModal() {
    showModal(false);
  }

  if (!delivery) {
    return <ActivityIndicator size={"large"} color="#145E7D" />
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Modal animationType="slide" transparent={true} visible={show} >
          <DeliveryItemToSelect item={produto} close={()=>handleCloseModal()}/>
        </Modal>
        <Header />
        <FlatList
          data={listaDeProdutos}
          ListHeaderComponent={() => <DeliveryHeader delivery={delivery} listbyaz={()=>listByAZ()}/>}
          ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há produtos deste Delivery!</Text>}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <DeliveryListItem item={item} dlvry={delivery} selectItem={()=>handleSelectItem(item)}/>}
        />
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
