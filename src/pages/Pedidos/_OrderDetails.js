import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useOrderContext } from "../../contexts/OrderContext";

import Item from "../../components/Item";

export default function OrderDetails({ id }) {
  const [pedido, setPedido] = useState();
  const { getOrder } = useOrderContext();

  useEffect(() => {
    getOrder(id).then(setPedido);
    console.log("Pedido: ", pedido);
  }, []);

  function OrderDetailsHeader({ order }) {
    const qtdDias = 2; //calcular nº de dias maior que 1 a partir do parâmetro date() - createdAt **
    return (
      <View>
        <View style={styles.page}>
          <Image source={{ uri: order.Delivery.url_imagem }} style={styles.image} />
          <View style={styles.container}>
            <Text style={styles.title}>{order.Delivery.nome}</Text>
            <Text style={styles.subtitle}>{order.status} &#8226; {qtdDias > 1 ? `${qtdDias} dias atrás` : ""} </Text>
            <Text style={styles.menuTitle}>Meus Pedidos</Text>
          </View>
        </View>
      </View>
    );
  };

  if (!pedido) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <FlatList
      data={pedido.itens}
      ListHeaderComponent={() => <OrderDetailsHeader order={pedido} />}
      renderItem={({ item }) => <Item basketItem={item} />}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7,
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  container: {
    margin: 10,
  },
});
