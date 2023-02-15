import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, Alert, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { DataStore } from 'aws-amplify';
import { Categoria } from '../../models';

import Header from '../../components/Header';

export default function Home() {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const result = await DataStore.query(Categoria);
        setCategorias(result);
        console.log("categorias: ", categorias);
      } catch (error) {
        console.error("Error (query: Categoria): ", error);
      }
    })();
  }, []);

  function LinkTo(page, p) {
    navigation.navigate(page, p);
  }

  if (!categorias) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color="#4DCE4D" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.title}>CATEGORIAS</Text>

        <FlatList
          data={categorias}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={()=>LinkTo('Deliveries', { id: item.id, descricao: item.descricao })}>
                <View style={styles.card}>
                  <Image source={{ uri: item.url_imagem }} style={styles.imagem} />
                  <Text style={styles.label}>{item.descricao}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
  },
  title:{
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  card:{
    flex: 1,
    height: 115,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  label:{
    fontSize: 18,
    fontWeight: 'bold',
    width: "70%"
  },
  imagem:{
    width: 100,
    height: 100,
    margin: 5
  },
  indicator:{
    flex:1, 
    position: 'absolute', 
    backgroundColor: '#000', 
    opacity: 0.7, 
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

        {/* <View>
          {categorias.map((categoria) => (
            <ScrollView key={categoria.ordem}>
              <TouchableOpacity onPress={()=>LinkTo('Deliveries', { id: categoria.id, descricao: categoria.descricao })}>
                <View style={styles.card}>
                  <Image source={{ uri: categoria.url_imagem }} style={styles.imagem} />
                  <Text style={styles.label}>{categoria.descricao}</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          ))}
        </View> */}

// console.warn("lista está vazia...");