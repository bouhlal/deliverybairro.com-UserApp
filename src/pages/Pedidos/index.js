import { View, Text, StyleSheet} from 'react-native';
import { authContext } from '../../context/Auth';

import Header from '../../components/Header';

export default function Pedidos() { 
  const { dbUser } = authContext();

  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Meus Pedidos</Text>
        <Text style={styles.line18}>{dbUser.email}</Text>
        <Text style={styles.line13}>{dbUser.token}</Text>
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
  title:{ 
    color: '#5D5D5D',
    fontSize: 18,
    marginTop: 25
  },
  subtitle:{
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold'
  },
  line18:{ 
    color: '#000', 
    fontSize: 18 
  },
  line13:{
    color: '#000',
    fontSize: 13,
    marginBottom: 10
  },
})

