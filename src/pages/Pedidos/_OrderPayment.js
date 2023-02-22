import React from 'react';
import { View, Text } from 'react-native';

import Header from '../../components/Header';

export default function OrderPayment({ id }) {
 return (
   <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <Header/>
      <Text style={{fontSize: 15, fontWeight: "bold"}}>Formas de Pagamentos</Text>
      <Text style={{fontSize: 13}}>Pedido nº {id}</Text>
   </View>
  );
}
