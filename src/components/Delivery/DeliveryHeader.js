import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

import NO_IMAGE from "../../../assets/no-image.jpg"

export default function DeliveryHeader({ delivery, listbyaz }) { 
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>{delivery.nome}</Text>
        <Image source={{uri: delivery.url_imagem}} style={styles.imagem} />
        <Text style={styles.info}>{delivery.horario}</Text>
        <Text style={styles.info}><Fontisto color="#FF0000" name='map-marker-alt' size={18}/> {delivery.latitude}, {delivery.longitude}</Text>
        <Text style={styles.info}>Valor da Taxa de Entrega: R$ {delivery.taxa_entrega.toFixed(2)}</Text>
        <Text style={[styles.info, {marginBottom: 10}]}>Tempo Estimado: {delivery.minDeliveryTime} a {delivery.maxDeliveryTime} min.</Text>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <TouchableOpacity onPress={listbyaz}>
            <MaterialCommunityIcons name='order-alphabetical-ascending' size={25} color={"#757575"} />
          </TouchableOpacity>
          <Text style={{fontSize: 14, fontWeight: "bold", marginRight: 10}}>CARDÁPIO</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // paddingVertical: 10,
    padding: 10
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  info:{
    fontSize: 13,
    color: "#707070",
  },
  imagem: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
})
