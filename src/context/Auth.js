import React, { useState, useEffect, useContext, createContext } from 'react';
// import { Alert } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [dbUser, setDbUser] = useState(null);
  const [user_authorized, setAuthorized] = useState(null);
  // const [loading, setLoading] = useState(false);

  const sub = user_authorized?.attributes?.sub; 

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: false }).then(setAuthorized);
  }, [])

  useEffect(() => {
    DataStore.query(User, (user) => user.token.eq(sub)).then((users) => {
      setDbUser(users[0]);
    });
  }, [sub]);

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error (signOut): ', error);
      setError(error.message);
    }
  }

  return(
    <AuthContext.Provider 
      value={{ 
        dbUser, user_authorized, sub, setDbUser, signOut
        // signed: !!dbUser, dbUser, loading, sub,
        // setDbUser, signIn, signUp, confirmSignUp, resendConfirmationCode, signOut
      }}
    >
      {children}
    </AuthContext.Provider> 
  )
}

export function authContext() {
  return useContext(AuthContext);
}
/**
  async function signIn(email, password) {
    setLoading(true);
    try {
      const user = await Auth.signIn(email, password);
      console.log("signIn: ",user);
      setDbUser(user);
      setLoading(false);
    } catch (error) {
      Alert.alert("Error (sigIn)", error.message);
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
          email: email, 
          given_name: nome,
          family_name: sobrenome,
          phone_number: telefone, // opcional - Convenção de número E.164
          // outros atributos personalizados
        },
      });
      console.log("signUp: ", user);
      setDbUser(user);
      setLoading(false); 
    } catch(error) {
      Alert.alert("Error (signUp)", error.message);
      setLoading(false);
    }
  }

  async function confirmSignUp({ props }) {
    const username = props.email;
    const code = props.code;
    try {
      await Auth.confirmSignUp(username, code);
      Alert.alert("Info",`Código enviado com sucesso! Confira o email enviado para: ${user.email}`);
    } catch (error) {
        Alert.alert("Error (confirmSignUp)", error.message);
        console.log("Error confirming Sign Up: ", error);
    }
  }

  async function resendConfirmationCode({ props }) {
    const username = props.email;
    try {
      const { user } =  await Auth.resendSignUp(username);
      Alert.alert("Info",`Código reenviado com sucesso! Confira novamente o email enviado para: ${user.email}`);
      console.log('Code resent successfully.');
    } catch (error) {
      Alert.alert("Error (resendConfirmationCode)", error.message);
      console.log("Error resend confirmation Code: ", error);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      // await AsyncStorage.clear();
      // setDbUser(null);
    } catch (error) {
      Alert.alert("Error (signOut)", error.message);
    }
  }

 */

// import AsyncStorage from '@react-native-async-storage/async-storage';
  // const [user_authorized, setAuthorized] = useState(null);
  // const sub = user_authorized?.attributes?.sub; 

  // useEffect(() => {
  //   Auth.currentAuthenticatedUser({ bypassCache: false }).then(setAuthorized);
  // }, [])

  // useEffect(() => {
  //   DataStore.query(User, (user) => user.token.eq(sub)).then((users) => {
  //     setDbUser(users[0]);
  //   });
  // }, [sub]);

  // AsyncStorage.clear();

  // useEffect(() => {
  //   async function loadStorage() {
  //     setLoading(true);
  //     const storageUser = await AsyncStorage.getItem('Auth_user');
  //     console.log("StorageUser: ", JSON.parse(storageUser));
  //     if (storageUser) {
  //       setDbUser(JSON.parse(storageUser));
  //       setLoading(false);
  //     } else {
  //       setLoading(false);
  //     }
  //   }
  //   loadStorage();
  // }, []);

  // storageUser(user);
  // storageUser(user);
  
  // async function storageUser(data) {
  //   await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  // }
