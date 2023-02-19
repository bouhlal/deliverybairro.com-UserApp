import { View, Text, StyleSheet } from "react-native";

export default function Item({ basketItem, produto }) {
  console.log("basketItem: ", basketItem);
  console.log("produto: ", produto);
  return (
    <View style={styles.row}>
      <View style={styles.quantity}>
        <Text>{basketItem.qtd}</Text>
      </View>
      <Text style={{ fontWeight: "600" }}>{(produto === null) ? "NULL" : produto.nome}</Text>
      <Text style={{ marginLeft: "auto" }}>$ {(produto === null) ? "NULL" : produto.vr_unitario}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  quantity: {
    backgroundColor: "lightgray",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});
