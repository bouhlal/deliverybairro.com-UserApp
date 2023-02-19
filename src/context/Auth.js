import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { Alert } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [user_authorized, setAuthorized] = useState(null);
  const [token, setToken] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  const sub = user_authorized?.attributes?.sub; 

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: false }).then(setAuthorized);
    setToken(sub); console.log("Token: ", token);
  }, [])

  useEffect(() => {
    DataStore.query(User, (usuario) => usuario.token.eq(sub)).then((usuarios) => {
      setUser(usuarios[0]);
    });
  }, [sub]);

  useEffect(() => {
    async function loadStorage() {
      console.log(showAsyncStorageContentInDev())
      setLoading(true);
      const storageUser = await AsyncStorage.getItem('Auth_user');
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
    loadStorage();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);
    try {
      const user = await Auth.signIn(email, password);
      console.log(user.attributes);
      Alert.alert("Info", "Confira os dados do Usuário no Console.LOG");
      const userData = { uid: user.username, email: user.attributes.email };
      setUser(userData);
      storageUser(userData);
      setLoadingAuth(false);
    } catch (error) {
      alert(error.message);
      setLoadingAuth(false);
    }
  }

  async function signUp(email, password, nome, sobrenome) {
    setLoadingAuth(true);
    await Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email: email,
        given_name: nome,
        family_name: sobrenome
      }
    })
    .then((response) => {
      let data = {
        uid: response.userSub,
        nome: response.user.attributes.given_name,
        sobrenome: response.user.attributes.family_name,
        email: response.user.attributes.email,
      };
      setUser(data);
      storageUser(data);
      setLoadingAuth(false);
    })
    .catch((error) => {
      Alert.alert("Erro!", error.message);
      setLoadingAuth(false);
    });
  }

  async function confirmSignUp(email, code) {
    try {
      await Auth.confirmSignUp(email, code);
      Alert.alert("Info","Código enviado com sucesso!");
    } catch (error) {
      Alert.alert("Erro!", error.message);
    }
  }

  async function resendConfirmationCode(email) {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("Info","Código reenviado com sucesso!");
      console.log('code resent successfully');
    } catch (error) {
      Alert.alert("Erro!", error.message);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      await AsyncStorage.clear();
      setUser(null);
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
        signed: !!user, user, loading, loadingAuth, token,
        signIn, signUp, confirmSignUp, resendConfirmationCode, signOut 
      }}
    >
      {children}
    </AuthContext.Provider> 
  )
}

export function authContext() {
  return useContext(AuthContext);
}
