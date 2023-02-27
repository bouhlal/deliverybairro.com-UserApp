/**
 * SignUp.js (src/pages/User/SignUp.js)
 */

import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TextInput, TouchableOpacity, Keyboard, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Background, Container } from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/AuthContext';

import logo from "../../../assets/logo.png";
import marca from "../../../assets/marca.png";

export default function CustomSignUp() {
  const navigation = useNavigation();
  const { authSignUp, loading } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");

  async function handleSignUp() {
    authSignUp({ email, password, telefone });
    Alert.alert("Atenção", "Um código de confirmação será enviado para o seu e-mail.");
    navigation.navigate('CustomSignUpCode', {email: email});
  }

  function maskEditPhone(formatted, extracted) {
    setTelefone(extracted);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <ScrollView style={styles.container}>

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
              onChangeText={(input) => setEmail(input.trim())}
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
              onChangeText={(input)=>setPassword(input.trim())}
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
              <View style={styles.indicator}>
                <ActivityIndicator size={"large"} color="#4DCE4D" />
              </View>
            ) : (
              <Text style={styles.btnText}>REGISTRAR USUÁRIO</Text>
            )}
          </TouchableOpacity>

          <Link onPress={() => navigation.navigate('CustomSignUpCode', {email: email})}>
            <LinkTxt>Confirmar código de verificação.</LinkTxt>
          </Link>


          <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('CustomSignIn')}>
            <Text style={styles.linkTxt}>Já tenho uma Conta!</Text>
          </TouchableOpacity>
        </ScrollView>

      </Container>
    </Background>
  );
}

const styles = StyleSheet.create({
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
  error: {
    color: 'red'
  },
  indicator:{
    flex:1, 
    justifyContent: "center",
    alignItems: "center",
  },
  areaInput:{
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 10,
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
  btnSubmit:{
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 7,
  },
  btnText:{
    fontSize: 20,
    color: "#FFF"
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
