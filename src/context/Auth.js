import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { Alert } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [dbUser, setDbUser] = useState(null);
  const [user_authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(false);

  const sub = user_authorized?.attributes?.sub; 

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: false }).then(setAuthorized);
  }, [])

  useEffect(() => {
    DataStore.query(User, (user) => user.token.eq(sub)).then((users) => {
      setDbUser(users[0]);
    });
  }, [sub]);

  useEffect(() => {
    async function loadStorage() {
      setLoading(true);
      const storageUser = await AsyncStorage.getItem('Auth_user');
      console.log(JSON.parse(storageUser));
      if (storageUser) {
        setDbUser(JSON.parse(storageUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    loadStorage();
  }, []);

  async function signIn(email, password) {
    setLoading(true);
    try {
      const { user } = await Auth.signIn({email: email, password: password});
      console.log("signIn: ",user);
      setDbUser(user);
      storageUser(user);
      setLoading(false);
    } catch (error) {
      Alert.alert("Erro!", error.message);
      setLoading(false);
    }
  }

  async function signUp(email, password, nome, sobrenome, telefone) {
    setLoading(true);
    try {
      const { user } = await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email, // opcional
          'custom:nome': nome,
          'custom:sobrenome': sobrenome,
          phone_number: telefone, // opcional - Convenção de número E.164
          // outros atributos personalizados
        },
        autoSignIn: { // optional - enables auto sign in after user is confirmed
          enabled: true,
        },
      });
      console.log("signUp: ",user);
      setDbUser(user);
      storageUser(user);
      setLoading(false); 
    } catch(error) {
      Alert.alert("Erro!", error.message);
      setLoading(false);
    }
  }

  async function confirmSignUp(email, code) {
    try {
      const { user } =  await Auth.confirmSignUp({username: email, code: code});
      Alert.alert("Info",`Código enviado com sucesso! Confira o email enviado para: ${user.email}`);
    } catch (error) {
      Alert.alert("Erro!", error.message);
    }
  }

  async function resendConfirmationCode(email) {
    try {
      const { user } =  await Auth.resendSignUp(email);
      Alert.alert("Info",`Código reenviado com sucesso! Confira novamente o email enviado para: ${user.email}`);
      console.log('code resent successfully');
    } catch (error) {
      Alert.alert("Erro!", error.message);
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.clear();
      await Auth.signOut();
      setDbUser(null);
    } catch (error) {
      Alert.alert("Erro!", error.message);
    }
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  return(
    <AuthContext.Provider 
      value={{ 
        signed: !!dbUser, dbUser, sub, loading, loadingAuth,
        setDbUser, signIn, signUp, confirmSignUp, resendConfirmationCode, signOut 
      }}
    >
      {children}
    </AuthContext.Provider> 
  )
}

export function authContext() {
  return useContext(AuthContext);
}
