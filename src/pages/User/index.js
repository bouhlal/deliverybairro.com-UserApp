import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { authContext } from '../../context/Auth';
import { Auth } from "aws-amplify";

import Header from '../../components/Header';

export default function Perfil() { 
  const { user, signOut } = authContext();

  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Dados do Usuário (Perfil)</Text>
        <Text style={styles.line18}>{user.attributes.email}</Text>
        <Text style={styles.line13}>{user.attributes.phone_number}</Text>
        <TouchableOpacity style={styles.btnClose} onPress={() => signOut()} >
          <Text style={styles.btnTxt}>Sign Out</Text>
        </TouchableOpacity>
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
  btnClose: {
    width: '50%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnTxt:{
    color: "#FFF", 
    textAlign: "center", 
  },
})

