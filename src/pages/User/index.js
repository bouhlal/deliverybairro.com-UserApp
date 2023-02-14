import React, { useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { AuthContext } from '../../context/Auth';

import Header from '../../components/Header';

export default function Perfil() { 
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Header/>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Dados do Usuário (Perfil)</Text>
            <Text>{user.email}</Text>
            <Text>{user.token}</Text>
          </View>
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

