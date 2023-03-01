/**
 * SignUp.js (src/pages/User/SignUp.js)
 */

import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Platform, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext';

import logo from "../../../assets/logo.png";
import marca from "../../../assets/marca.png";

export default function CustomSignUp() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");

  const { loading, authSignUp } = useAuthContext();

  async function handleSignUp() {
    authSignUp(email, password, telefone);
    Alert.alert("Atenção", "Um código de confirmação será enviado para o seu e-mail.");
    navigation.navigate('CustomSignUpCode', {email: email});
  }

  function maskEditPhone(formatted, extracted) {
    setTelefone(extracted);
  }

  return (
    <View style={styles.background}>
      <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>

        <ScrollView style={{flex: 1}}>
          <View style={styles.header}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
            <Image source={marca} style={styles.marca} resizeMode="contain" />
            <Text style={styles.subtitle}>Cadastre-se, é simples e rápido!</Text>
          </View>

          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Telefone:</Text>
            <TextInputMask
              value={telefone}
              type={'custom'}
              options={{
                mask: '+55 99 99999-9999',
              }}
              onChangeText={maskEditPhone}
              keyboardType="numeric"
              placeholder="+55 31 99999-9999"
              style={styles.input}
            />
          </View>

          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Email:</Text>
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
            <Text style={{marginBottom: 5}}>Senha:</Text>
            <TextInput
              value={password}
              placeholder='Senha'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='numeric'
              onChangeText={(input)=>setPassword(input)}
              onSubmitEditing={() => Keyboard.dismiss()}
              secureTextEntry={true}
              style={styles.input}
            />
          </View>

          <Text style={{fontSize: 14, textAlign: 'center', margin: 10}} >
            *Ao clicar em "Registrar Usuário", você estará concordando com nossa Política de Uso e Privacidade.
          </Text>

          <TouchableOpacity style={styles.btnSubmit} onPress={() => handleSignUp()}>
            {loading ? (
              <ActivityIndicator size={"large"} color="#FFF" />
            ) : (
              <Text style={styles.btnTxt}>REGISTRAR USUÁRIO</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.link}  onPress={() => navigation.navigate('CustomSignUpCode', {email: email})}>
            <Text style={styles.linkTxt}>Confirmar código de verificação.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('CustomSignIn')}>
            <Text style={styles.linkTxt}>Já tenho uma Conta!</Text>
          </TouchableOpacity>

        </ScrollView>

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
  scrollview:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header:{
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10,
  },
  logo:{
    width: 50, 
    height: 50,
  },
  marca:{
    width: 150, 
    height: 50, 
    marginBottom: 15,
  },
  title:{
    fontSize: 21, 
    fontWeight: 'bold',
  },
  subtitle:{
    fontSize: 18,
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
