import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Keyboard, Alert, Platform } from 'react-native';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { authContext } from '../../context/Auth';

import logo_png from '../../../assets/logo.png';
import marca_png from '../../../assets/marca.png';

export default function SignUp() {
  const navigation = useNavigation();
  const { signUp, msg_error, loading } = authContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function RegisterUser() {
    signUp(email.trim(), password.trim());
    Alert.alert("Atenção", "Um código de confirmação foi enviado para o seu e-mail.");
    navigation.navigate('SignUpCode', {email: email});
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <View style={styles.header}>
          <Image source={logo_png} style={styles.logo} resizeMode="contain" />
          <Image source={marca_png} style={styles.mark} resizeMode="contain" />
          <Text style={styles.subtitle}>Cadastre-se, é simples e rápido!</Text>
        </View>

        <AreaInput>
          <Text>Email:</Text>
          <Input
            value={email}
            placeholder='username@email.com'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(input)=>setEmail(input)}
          />
        </AreaInput>

        <AreaInput>
          <Text>Senha:</Text>
          <Input
            value={password}
            placeholder='Senha'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText={(input)=>setPassword(input)}
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={true}
          />
        </AreaInput>

        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
          <Text style={{fontSize: 14, textAlign: 'center', marginLeft: 25, marginRight: 25}} >
            *Ao clicar em "Registrar Usuário", você estará concordando com nossa Política de Uso e Privacidade.
          </Text>
        </View>

        <BtnSubmit onPress={()=>RegisterUser()}>
          {loading ? (
            <View style={styles.indicator}>
              <ActivityIndicator size={"large"} color="#4DCE4D" />
            </View>
          ) : (
            <BtnTxt>REGISTRAR USUÁRIO</BtnTxt>
          )}
        </BtnSubmit>

        {msg_error && 
          <Text style={styles.error}>{msg_error}</Text>
        }

        <Link onPress={()=>navigation.navigate('SignIn')}>
          <LinkTxt>Já tenho uma Conta!</LinkTxt>
        </Link>

      </Container>
   </Background>
  );
}

const styles = StyleSheet.create({
  header:{
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10
  },
  logo:{
    width: 50, 
    height: 50
  },
  mark:{
    width: 150, 
    height: 50, 
    marginBottom: 15
  },
  title:{
    fontSize: 21, 
    fontWeight: 'bold'
  },
  subtitle:{
    fontSize: 18
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

