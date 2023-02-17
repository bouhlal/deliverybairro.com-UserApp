import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CardItem({ data, AddQtd, RemoveQtd }) {
  const [qtd, setQtd] = useState(data?.qtd);

  function add(){
    AddQtd();
    setQtd(item => item +1);
  }

  function remove(){
    RemoveQtd();
    if(qtd === 0){
      setQtd(0);
      return;
    }
    setQtd(item => item -1);
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.nome}>{data.nome}</Text>
          <Text style={styles.preco}>R$ {data.vr_unitario.toFixed(2)}</Text>
        </View>
        <View style={styles.qtd}>
          <TouchableOpacity onPress={add}>
            <Ionicons name="ios-add-circle-outline" size={30} color="green" />
          </TouchableOpacity>
          <Text style={styles.qtdText}>{qtd}</Text>
          <TouchableOpacity onPress={remove}>
            <Ionicons name="md-remove-circle-outline" size={30} color="red"/>
          </TouchableOpacity>
        </View>
      </View>
      <Image style={styles.imagem} source={{uri: data.url_imagem}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 10,
    padding: 5,
  },
  nome:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  preco:{
    fontSize: 16,
  },
  qtd:{
    width: 100, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 5
  },
  qtdText:{
    color: '#000', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  imagem:{
    width: 75, 
    height: 75,
  },

})