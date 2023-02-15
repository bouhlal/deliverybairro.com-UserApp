import { View, Text, StyleSheet} from 'react-native';
import { authContext } from '../../context/Auth';

import Header from '../../components/Header';

export default function CartInfo() { 
  const { user } = authContext();

  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text>Minhas Compras (Cart)</Text>
        <Text>{user.email}</Text>
        <Text>{user.token}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: "#FFF",
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

