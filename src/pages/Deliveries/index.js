import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { API, graphqlOperation, DataStore } from 'aws-amplify';
import { Delivery } from "../../models";

import Header from '../../components/Header';

export default function Deliveries({ route }) {
  const navigation = useNavigation();
  const [deliveries, setDeliveries] = useState([]);

  const DEFAULT_IMAGE = "https://deliverybairro-storage-25990171215340-staging.s3.amazonaws.com/images/sem-imagem.png";
  // console.warn(route.params?.id);
  const id = route.params?.id;

  useEffect(() => {
    (async function() {
      try {
        // await DataStore.query(Delivery).then(setDeliveries);
        await DataStore.query(Delivery, (delivery) => delivery.Categorias?.categoriaId.eq(id)).then(setDeliveries)
        console.log("deliveries: ", deliveries);
      } catch(error) {
        console.error("Error (query: Delivery): ", error);
      }
    })();
  }, [route.params?.id]);

  function LinkTo(page, p) {
    navigation.navigate(page, p);
  }

  if (!deliveries) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color="#FFB901" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.categoria_title}>{route.params.descricao}</Text>

        <FlatList
          data={deliveries}
          keyExtractor={(item) => item?.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>LinkTo('Delivery', { id: item?.id })}>
              <Text style={styles.delivery_title}>{item?.nome}</Text>
              <Image 
                source={{ uri: (!item?.url_imagem) ? DEFAULT_IMAGE : item?.url_imagem }} 
                style={styles.imagem} 
              />
              <View style={styles.row}>
                <Text style={styles.subtitle}>
                  Taxa de Entrega R$ {item?.taxa_entrega.toFixed(2)} &#8226;{" "}
                  {item?.minDeliveryTime}-{item?.maxDeliveryTime} minutos
                </Text>
                <View style={styles.rating}>
                  <Text style={{color: "#FFF"}}>{item?.rating.toFixed(1)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => <Text style={styles.empty}>Ainda não há Deliveries cadastrados nesta categoria.</Text>}
          showsVerticalScrollIndicator={true}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginVertical: 10,
  },
  label:{
    fontSize: 21,
    fontWeight: 'bold'
  },
  imagem: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  categoria_title:{
    fontSize: 21,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  delivery_title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    color: "grey",
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "black",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  empty:{
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10
  }
})

// <Text style={styles.subtitle}>{delivery.horario}</Text>
// <Text style={styles.subtitle}><Fontisto color="#FF0000" name='map-marker-alt' size={18}/> -19.99999,-43.99999</Text>
// renderItem={({delivery}) => <DeliveryCard card={delivery} />} 

/** 
  <View>
    {deliveries.map((delivery) => (
      <ScrollView key={delivery.id}>
        <TouchableOpacity onPress={()=>LinkTo('Delivery', { id: delivery.id })}>
          <Text style={styles.delivery_title}>{delivery.nome}</Text>
          <Image 
            source={{ uri: (!delivery.url_imagem) ? DEFAULT_IMAGE : delivery.url_imagem }} 
            style={styles.imagem} 
          />
          <View style={styles.row}>
            <Text style={styles.subtitle}>
              Taxa de Entrega R$ {delivery.taxa_entrega.toFixed(2)} &#8226;{" "}
              {delivery.minDeliveryTime}-{delivery.maxDeliveryTime} minutos
            </Text>
            <View style={styles.rating}>
              <Text style={{color: "#FFF"}}>{delivery.rating.toFixed(1)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    ))}
  </View> 

*/
