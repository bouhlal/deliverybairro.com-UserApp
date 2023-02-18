import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Platform, ActivityIndicator, Alert } from 'react-native';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { authContext } from '../../context/Auth';

import logo_png from '../../../assets/logo.png';
import marca_png from '../../../assets/marca.png';

export default function SignIn() {
  const navigation = useNavigation();
  const { signIn, loadingAuth } = authContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  function login() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <Image source={logo_png} style={styles.logo} resizeMode="contain" />
        <Image source={marca_png} style={styles.mark} resizeMode="contain" />

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
            // onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={true}
          />
        </AreaInput>

        <BtnSubmit onPress={login}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color='#FFF' />
          ) : (
            <BtnTxt>ACESSAR</BtnTxt>
          )}
        </BtnSubmit>

        <Link onPress={() => navigation.navigate('SignUp')}>
          <LinkTxt>Ainda não possui Conta? Junte-se a Nós!</LinkTxt>
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
  mark:{
    width: 300, 
    height: 100,
    marginBottom: 15
  },
  error: {
    color: 'red'
  },
  indicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

/**
<BtnSubmit onPress={login}>
{loadingAuth ? (
  <View style={styles.indicator}>
    <ActivityIndicator size={"large"} color="#000" />
  </View>
) : (
  <BtnTxt>ACESSAR</BtnTxt>
)}
</BtnSubmit>
**/