import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import Header from '../../components/Header';

export default function Delivery() { 

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Header/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Delivery</Text>
        </View>
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

