import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderListItem({ pedido }) {
  const navigation = useNavigation();

  function onPress() {
    navigation.navigate("OrderDetails", { id: pedido.id },);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
    >
      <Image
        source={{ uri: pedido.Delivery.url_imagem }}
        style={{ width: 135, height: 75, marginRight: 5 }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {pedido.Delivery.nome}
        </Text>
        <Text style={{ marginVertical: 5 }}>{pedido.qtd} items &#8226; R$ {pedido.total}</Text>
        <Text>2 days ago &#8226; {pedido.status} </Text>
      </View>
    </TouchableOpacity>
  );
};
