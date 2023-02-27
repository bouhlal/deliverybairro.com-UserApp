/**
 * SignUpCode.js (src/pages/User/SignUpCode.js)
 */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image, Keyboard, ActivityIndicator, Platform } from 'react-native';
import { Background, Container, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/marca.png';

export default function CustomSignUpCode({ route }) {
  const navigation = useNavigation();
  const { authConfirmSignUp, authResendConfirmationCode, loading } = useAuthContext();
  const [username, setUsername] = useState(route?.params?.email);
  const [code, setCode] = useState("");

  function handleConfirmSignUpCode() {
    authConfirmSignUp({username, code});
    navigation.navigate('CustomSignIn');
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={marca} style={styles.marca} resizeMode="contain" />

        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Usuário:</Text>
          <TextInput
            value={username}
            placeholder='username@email.com'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(input) => setUsername(input.trim())}
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
            onChangeText={(input)=>setCode(input.trim())}
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={false}
            style={styles.input}
          />
        </View>

        <BtnSubmit onPress={() => handleConfirmSignUpCode()}>
          {loading ? (
            <View style={styles.indicator}>
              <ActivityIndicator size={"large"} color="#FF0000" />
            </View>
          ) : (
            <BtnTxt>CONFIRMAR CÓDIGO</BtnTxt>
          )}
        </BtnSubmit>

        <BtnSubmit onPress={()=>navigation.navigate('CustomSignIn')}>
          <BtnTxt>EFETUAR LOGIN</BtnTxt>
        </BtnSubmit>

        <Link onPress={() => authResendConfirmationCode()}>
          <LinkTxt>Código não recebido? Renviar Código.</LinkTxt>
        </Link>

      </Container>
    </Background>
  );
}

const styles = StyleSheet.create({
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
    width: "90%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
    marginTop: 10
  },
  input:{
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    fontSize: 17,
    color: "#000",
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 7,
  },
  error: {
    color: 'red'
  },
  indicator:{
    flex:1, 
    position: 'absolute', 
    backgroundColor: '#000', 
    opacity: 0.7, 
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})
