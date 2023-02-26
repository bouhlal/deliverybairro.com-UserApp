/**
 * AuthContext.js (src/contexts/AuthContext.js)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

const STORAGE_KEY = '@auth_user';

const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  const USER_KEY = '@UserApp:user';
  const TOKEN_KEY = '@UserApp:token';

  function fetchUser() {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(user => {
        setAuthUser(user);
        console.log("authUser: ", user);
        const sub = user?.attributes?.sub;
        if (sub) {
          DataStore.query(User, (user) => user.token.eq(sub)).then((users) => {
            setDbUser(users[0]);
            console.log("dbUser: ", dbUser);
            AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(users[0]));
          });
        }
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  async function signIn({ props }) {
    const username = props.email;
    const password = props.password;
    setLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      // Armazena o token e os dados do usuário no AsyncStorage
      await AsyncStorage.multiSet([
        [TOKEN_KEY, user.token],
        [USER_KEY, JSON.stringify(user)],
      ]);
      // 
      setDbUser(user);
      setToken(user.token)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível realizar o login. Verifique suas credenciais e tente novamente.');
    }
  }

  async function signUp({ props }) {
    const username = props.email;
    const password = props.password;
    const email = props.email;
    const phone_number = props.telefone;
    setLoading(true);
    try {
      const { user } = await Auth.signUp({
        username,
        password, 
        attributes: {
          email, 
          phone_number,
        },
      });
      console.log(user);
      setDbUser(user);
      setLoading(false);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch(error) {
      Alert.alert("SignUp Error: ", error.message);
      console.log(error.message);
      setLoading(false);
    }
  }

  async function confirmSignUp({ props }) {
    const username = props.email;
    const code = props.code;
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      Alert.alert("Info",`Código enviado com sucesso! Confira o email enviado para: ${username}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel enviar o código de verificação. Tente novamente.");
      setLoading(false);
    }
  }

  async function resendConfirmationCode({ props }) {
    const username = props.email;
    setLoading(true);
    try {
      const { user } =  await Auth.resendSignUp(username);
      Alert.alert("Info",`Código reenviado com sucesso! Confira novamente o email enviado para: ${user.email}`);
      console.log('Código reenviado com sucesso.');
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possivel reenviar o código de verificação. Tente novamente.");
      setLoading(false);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
      setDbUser(null);
      setToken(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o logout. Tente novamente.');
    }
  }

  return(
    <AuthContext.Provider value={{ 
      authUser, dbUser, token, setDbUser,
      signIn, signUp, confirmSignUp, resendConfirmationCode, signOut
    }}>
      {children}
    </AuthContext.Provider> 
  )
}

export const useAuthContext = () => useContext(AuthContext);

  // import AsyncStorage from '@react-native-async-storage/async-storage';

  // const sub = authUser?.attributes?.sub; 
  
  // useEffect(() => {
  //   Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  //   console.log("authUser: ", authUser);
  // // const token = authUser?.signInUserSession?.accessToken?.jwtToken;
  // }, [])

  // useEffect(() => {
  //   DataStore.query(User, (user) => user.token.eq(sub)).then((users) => {
  //     setDbUser(users[0]);
  //     console.log("dbUser: ", dbUser);
  //   });
  // }, [sub]);

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
      // AsyncStorage.clear();

// async function storageUser(data) {
//   await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
// }
