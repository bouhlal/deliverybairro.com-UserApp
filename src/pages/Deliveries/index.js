import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Delivery } from "../../models";

import Header from '../../components/Header';
import NO_IMAGE from "../../../assets/no-image.jpg";

export default function Deliveries({ route }) {
  const navigation = useNavigation();
  const [deliveries, setDeliveries] = useState([]);

  const id = route.params?.id; console.log("Categoria ID: ", route.params?.id);

  useEffect(() => {
    (async function() {
      try {
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
      <Header />
      <View style={styles.container}>
        <Text style={styles.categoria_title}>{route.params.descricao}</Text>
        <FlatList
          data={deliveries}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>LinkTo("DeliveryInfo", { id: item?.id })}>
              <Text style={styles.delivery_title}>{item?.nome}</Text>
              <Image source={!item?.url_imagem ? NO_IMAGE : {uri: item?.url_imagem}} style={styles.imagem} />
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
          ListEmptyComponent={() => <Text style={styles.empty}>Não há Deliveries disponíveis nesta categoria.</Text>}
          showsVerticalScrollIndicator={true}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
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
    fontSize: 28,
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
