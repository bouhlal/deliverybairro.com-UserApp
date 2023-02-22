import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Platform, ActivityIndicator, Alert } from 'react-native';
import { Background, Container, AreaInput, Input, BtnSubmit, BtnTxt, Link, LinkTxt } from './styles';
import { useNavigation } from '@react-navigation/native';
import { authContext } from '../../context/Auth';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/marca.png';

export default function SignUpCode({ route }) {
  const { loading, confirmSignUp, resendConfirmationCode } = authContext();
  const navigation = useNavigation();
  const [code, setCode] = useState("");

  const email = route.params?.email;

  function SendCode() {
    confirmSignUp(email, code);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled >

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={marca} style={styles.marca} resizeMode="contain" />

        <AreaInput>
          <Text>Informe o código de confirmação:</Text>
          <Input
            value={code}
            placeholder='123456'
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText={(input)=>setCode(input)}
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={false}
          />
        </AreaInput>

        <BtnSubmit onPress={()=>SendCode()}>
          {loading ? (
            <View style={styles.indicator}>
              <ActivityIndicator size={"large"} color="#FF0000" />
            </View>
          ) : (
            <BtnTxt>CONFIRMAR CÓDIGO</BtnTxt>
          )}
        </BtnSubmit>

        <Link onPress={()=>resendConfirmationCode()}>
          <LinkTxt>Enviar Código novamente?</LinkTxt>
        </Link>

        <Link onPress={()=>navigation.navigate('SignIn')}>
          <LinkTxt>EFETUAR LOGIN</LinkTxt>
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
