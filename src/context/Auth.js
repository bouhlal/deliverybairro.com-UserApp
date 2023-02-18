import React, { useState, useEffect, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [user_authorized, setAuthorized] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg_error, setMsgError] = useState("");

  const token = user_authorized?.attributes?.token; 

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthorized);
  }, [])

  useEffect(() => {
    DataStore.query(User, (usuario) => usuario.token.eq(token)).then((usuarios) => {
      setUser(usuarios[0]);
      console.log(user);
    });
  }, [token]);

  useEffect(() => {
    async function loadStorage() {
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
      const userData = { uid: user.username, email: user.attributes.email };
      setUser(userData);
      storageUser(userData);
      setLoadingAuth(false);
    } catch (error) {
      // alert(error.message);
      setMsgError(error.message);
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
      // alert(error.message);
      setMsgError(error.message);
      setLoadingAuth(false);
    });
  }

  async function confirmSignUp(email, code) {
    try {
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      // alert(error.message);
      console.log('Error (Confirming signUp): ', error);
      setMsgError(error.message);
    }
  }

  async function resendConfirmationCode(email) {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("Info","Código reenviado com sucesso!");
      console.log('code resent successfully');
    } catch (error) {
      // alert(error.message);
      console.log('Error (resending code): ', error);
      setMsgError(error.message);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      // alert(error.message);
      setMsgError(error.message);
    }
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  return(
    <AuthContext.Provider 
      value={{ 
        signed: !!user, user, loading, loadingAuth, msg_error, token,
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

// export const AuthContext = createContext({});
// function AuthProvider({ children }) {
// export default AuthProvider;

// async function signUp(email, password, nome, sobrenome) {
//   setLoadingAuth(true);
//   try {
//     await Auth.signUp({ username: email, password, attributes: { email, name: nome+" "+sobrenome } });
//     const userData = { uid: email, email };
//     setUser(userData);
//     storageUser(userData);
//     setLoadingAuth(false);
//   } catch (error) {
//     alert(error.message);
//     setLoadingAuth(false);
//   }
// }

/**
import React, { useContext } from 'react';
import { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';

import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user_authorized, setAuthorized] = useState(null);
  const [user, setUser] = useState(null);
  const [msg_error, setMsgError] = useState("");
  
  const token = user_authorized?.attributes?.token; 

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthorized);
  }, [])

  useEffect(() => {
    DataStore.query(User, (usuario) => usuario.token.eq(token)).then((usuarios) => {
      setUser(usuarios[0]);
      console.log(user);
    });
  }, [token]);

  async function signIn(email, password) {
    setLoading(true);
    try {
      const user = await Auth.signIn({username: email, password: password});
      // console.log("usuário logado: ", user); 
      setUser(user);
    } catch (error) {
        console.log('Error (signIn): ', error);
        setMsgError(error.message);
    }
    setLoading(false);
  };

  async function signUp( email, password ) {
    setLoading(true);
    try {
      const user = await Auth.signUp({ 
        username: email, 
        password: password,
        autoSignIn: {
          email: email,
        }
      });
      console.log("user signed up:", user);
      setUser(user); 
    } catch (error) {
      console.error('Error (singUp): ', error);
      setMsgError(error.message);
    }
    setLoading(false);
  }

  async function confirmSignUp(email, code) {
    try {
      await Auth.confirmSignUp(email, code, { forceAliasCreation: false });
    } catch (error) {
      console.log('Error (Confirming signUp): ', error);
      setError(error.message);
    }
  }

  async function resendConfirmationCode(email) {
    try {
      await Auth.resendSignUp(email);
      Alert.alert("Info","Código reenviado com sucesso!");
      console.log('code resent successfully');
    } catch (error) {
      console.log('Error (resending code): ', error);
      setError(error.message);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error (signOut): ', error);
      setError(error.message);
    }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        token, user, user_authorized, loading, msg_error,
        signIn, signUp, signOut, confirmSignUp, resendConfirmationCode,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
};

export function authContext() {
  return useContext(AuthContext);
}
**/