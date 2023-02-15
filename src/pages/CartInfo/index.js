import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';

export default function CartInfo() { 
  return (
    <View style={styles.container}>
      <Header/>
      <Text>Minhas Compras (Cart)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})
