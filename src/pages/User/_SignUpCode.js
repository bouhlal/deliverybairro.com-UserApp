/**
 * SignUpCode.js (src/pages/User/SignUpCode.js)
 */

import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/marca.png';

export default function CustomSignUpCode({ route }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState(route?.params?.email);
  const [code, setCode] = useState("");

  const { loading, authConfirmSignUp, authResendConfirmationCode } = useAuthContext();

  function handleConfirmSignUpCode() {
    authConfirmSignUp(email, code);
    navigation.navigate('CustomSignIn');
  }

  return (
    <View style={styles.background}>
      <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={marca} style={styles.marca} resizeMode="contain" />

        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Usuário:</Text>
          <TextInput
            value={email}
            placeholder='username@email.com'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(input) => setEmail(input)}
            style={styles.input}
          />
        </View>

        <View style={styles.areaInput}>
          <Text>Código de confirmação:</Text>
          <TextInput
            value={code}
            placeholder="######"
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText={(input)=>setCode(input)}
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={false}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={() => handleConfirmSignUpCode()}>
          {loading ? (
            <ActivityIndicator size={"large"} color="#FFF" />
          ) : (
            <Text style={styles.btnTxt}>CONFIRMAR CÓDIGO</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('CustomSignIn')}>
          <Text style={styles.linkTxt}>EFETUAR LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => authResendConfirmationCode()}>
          <Text style={styles.linkTxt}>Código não recebido? Renviar Código.</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    padding: 10
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  logo:{
    width: 100, 
    height: 100
  },
  marca:{
    width: 300, 
    height: 100,
    marginBottom: 15
  },
  areaInput:{
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
  },
  input:{
    width: "95%",
    height: 50,
    backgroundColor: "#FFF",
    padding: 10,
    borderColor: "#8CB8D2",
    borderWidth: 1,
    borderRadius: 7,
    fontSize: 17,
    color: "#000",
  },
  btnSubmit:{
    width: "95%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    margin: 10,
  },
  btnTxt:{
    color: "#FFF", 
    fontSize: 20,
    textAlign: "center", 
  },
  link: {
    marginTop: 10,
    marginBottom: 10,
  },
  linkTxt:{
    textAlign: "center",
    color: "#000",
  }
})
