/**
 * SignUp.js (src/pages/User/SignUp.js)
 */

import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView, View, Image, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Platform, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

import logo from "../../../assets/logo.png";
import marca from "../../../assets/marca.png";

export default function CustomSignUp() {
  const { loading, authSignUp } = useContext(AuthContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telefone, setTelefone] = useState("");
  
  const navigation = useNavigation();
  function checkEmptyField(field){
    if(field.trim()==='') {
      return false;
    } else {
      return true;
    }
  }

  function signUp() {
    const vUsername = checkEmptyField(email);
    const vPassword = checkEmptyField(password);
    const vPhoneNumber = checkEmptyField(telefone);
    const vEmail = checkEmptyField(email);

    if(!vEmail || !vPassword || vPhoneNumber || vEmail) {
      alert('Preencha todos os campos!');
    } else {
      authSignUp({ vUsername, vPassword, attributes: { vEmail, vPhoneNumber } });
      Alert.alert("Atenção","Um código de confirmação foi enviado para o seu e-mail.");
      navigation.navigate('SignUpCode', {email: vEmail});
    }
  }

  // async function signUp() {
  //   const username = email;
  //   const phone_number = telefone;
  //   setLoading(true);
  //   try {
  //     const { user } = await Auth.signUp({ username, password, attributes: { email, phone_number } });
  //     setLoading(false);
  //     console.log('Sign-Up Confirmed');
  //     navigation.navigate('CustomSignUpCode', {email: email})
  //   } catch (error) {
  //     setLoading(false);
  //     Alert.alert('Erro', 'Não foi possível registrar o login. Tente novamente.');
  //     console.log('Error signing up...', error);
  //   }
  // }

  // async function handleSignUp() {
  //   authSignUp(email, password, telefone);
  //   Alert.alert("Atenção", "Um código de confirmação será enviado para o seu e-mail.");
  //   navigation.navigate('CustomSignUpCode', {email: email});
  // }

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
              onSubmitEditing={() => Keyboard.dismiss()}
              style={styles.input}
            />
          </View>

          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Email:</Text>
            <TextInput
              value={email}
              onChangeText={(input) => setEmail(input)}
              placeholder='username@email.com'
              autoCapitalize='none'
              keyboardType="email-address"
              textContentType="emailAddress"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={styles.input}
            />
          </View>

          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Senha:</Text>
            <TextInput
              value={password}
              onChangeText={(input)=>setPassword(input)}
              placeholder='Senha'
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType='numeric'
              secureTextEntry={true}
              // onSubmitEditing={() => Keyboard.dismiss()}
              textContentType="password"
              onSubmitEditing={() => Keyboard.dismiss()}
              style={styles.input}
            />
          </View>

          <Text style={{fontSize: 14, textAlign: 'center', margin: 10}} >
            *Ao clicar em "Registrar Usuário", você estará concordando com nossa Política de Uso e Privacidade.
          </Text>

          <TouchableOpacity style={styles.btnSubmit} onPress={signUp}>
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
