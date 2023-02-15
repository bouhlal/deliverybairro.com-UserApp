import { View, Text, Image, StyleSheet} from 'react-native';

import NO_IMAGE from "../../../assets/no-image.jpg"

export default function DeliveryHeader({ delivery }) { 
  return (
    <View style={styles.page}>
      <Image
        source={!delivery.url_imagem ? NO_IMAGE : {uri: delivery.url_imagem}} 
        style={styles.image} 
      />
      <View style={styles.container}>
        <Text style={styles.title}>{delivery.nome}</Text>
        <Text style={styles.subtitle}>Valor da Taxa de Entrega: R$ {delivery.taxa_entrega.toFixed(2)}</Text>
        <Text style={styles.subtitle}>Tempo Estimado: {delivery.minDeliveryTime} a {delivery.maxDeliveryTime} min.</Text>
        <Text style={styles.menuTitle}>CARDÁPIO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    padding: 10
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },

})
