import React, { useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { OrderContext } from '../../contexts/OrderContext';

import Header from '../../components/Header';
import OrderListItem from '../../components/Order/OrderListItem';

export default function Pedidos() { 
  const { pedidos } = useContext(OrderContext);
  console.log(pedidos)

  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Meus Pedidos</Text>
        <FlatList
          data={pedidos}
          renderItem={({ item }) => <OrderListItem order={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    width: "100%",
    backgroundColor: "#FFF",
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title:{ 
    color: '#5D5D5D',
    fontSize: 18,
    marginTop: 25
  },
  subtitle:{
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold'
  },
  line18:{ 
    color: '#000', 
    fontSize: 18 
  },
  line13:{
    color: '#000',
    fontSize: 13,
    marginBottom: 10
  },
})

