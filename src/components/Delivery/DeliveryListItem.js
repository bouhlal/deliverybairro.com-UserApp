import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import NO_IMAGE from "../../../assets/sem-imagem.jpg";

export default function DeliveryListItem({ item, selectItem }) {
  const produto = item;
  
  console.log("DeliveryListItem: ", produto);
  return (
    <TouchableOpacity onPress={selectItem} style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{produto.nome}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {produto.descricao}
        </Text>
        <Text style={styles.price}>R$ {(produto.vr_unitario > 0) ? parseFloat(produto.vr_unitario).toFixed(2) : "0,00"}</Text>
      </View>
      <Image style={styles.image} source={!produto.url_imagem ? NO_IMAGE : {uri: produto.url_imagem}} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 75,
    aspectRatio: 1,
  }
});
