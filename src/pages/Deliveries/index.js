import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { DataStore } from "aws-amplify";
import { Delivery } from "../../models";

import Header from '../../components/Header';

export default function Deliveries({ route }) {
  const navigation = useNavigation();
  const [deliveries, setDeliveries] = useState([]);

  const DEFAULT_IMAGE = "https://deliverybairro-storage-25990171215340-staging.s3.amazonaws.com/images/sem-imagem.png";
  console.warn(route.params?.id);
  const id = route.params?.id;

  // const lista = await DataStore.query(Delivery, (delivery) => delivery.Categoria?.id.eq(route.params?.id));
  // setDeliveries(lista);

  useEffect(() => {
    (async function() {
      try {
        const result = await DataStore.query(Delivery);
        setDeliveries(result);
        console.log("deliveries: ", deliveries);
      } catch(error) {
        console.error("Error (query: Delivery): ", error);
      }
    })();
  }, [route.params?.id]);

  //   })();
  // }, []);

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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1
  },
  delivery_title: {
    color: "black",
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
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
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  }
})

  // container:{
  //   flex: 1,
  //   backgroundColor: "#FFF",
  // },
  // card:{
  //   flex: 1,
  //   height: 120,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  //   borderBottomColor: 'lightgray',
  //   borderBottomWidth: 1
  // },
  // title: {
  //   fontSize: 16,
  //   fontWeight: "500",
  //   marginVertical: 5,
  // },

  // <Text style={styles.subtitle}>{delivery.horario}</Text>
  // <Text style={styles.subtitle}><Fontisto color="#FF0000" name='map-marker-alt' size={18}/> -19.99999,-43.99999</Text>

  // renderItem={({delivery}) => <DeliveryCard card={delivery} />} 
