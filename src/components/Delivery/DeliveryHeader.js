import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import NO_IMAGE from "../../../assets/no-image.jpg"

export default function DeliveryHeader({ delivery, listbyaz }) { 
  return (
    <View style={styles.page}>
      <Image
        source={!delivery.url_imagem ? NO_IMAGE : {uri: delivery.url_imagem}} 
        style={styles.image} 
      />
      <View style={styles.container}>
        <Text style={styles.title}>{delivery.nome}</Text>
        <Text style={styles.subtitle}>Valor da Taxa de Entrega: R$ {delivery.taxa_entrega.toFixed(2)}</Text>
        <Text style={[styles.subtitle, {marginBottom: 20}]}>Tempo Estimado: {delivery.minDeliveryTime} a {delivery.maxDeliveryTime} min.</Text>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <TouchableOpacity onPress={listbyaz}>
            <MaterialCommunityIcons name='order-alphabetical-ascending' size={35} color={"gray"} />
          </TouchableOpacity>
          <Text style={{fontSize: 18, marginRight: 20}}>CARDÁPIO</Text>
        </View>
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
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },

})
