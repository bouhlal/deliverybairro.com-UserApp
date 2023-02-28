/**
 * AuthContext.js (src/contexts/AuthContext.js)
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

const AuthContext = createContext({});

export default function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  const token = authUser?.attributes?.sub;

  function loadUser() {
    Auth.currentAuthenticatedUser({ bypassCache: true })
      .then(user => {
        setAuthUser(user);
        console.log("authUser: ", user);
        const sub = user?.attributes?.sub;
        if (sub) {
          DataStore.query(User, (user) => user.token.eq(sub)).then((users) => {
            setDbUser(users[0]);
            console.log("dbUser: ", users[0]);
          });
        }
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    loadUser();
  }, []);

  async function authSignIn(email, password) {
    const username = email;
    setLoading(true);
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      setDbUser(user);
      // setToken(user.signInUserSession.accessToken.jwtToken);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível realizar o login. Verifique suas credenciais e tente novamente.');
    }
  }

  async function authSignUp(email, password, telefone) {
    const username = email;
    const password = password;
    const email = email;
    const phone_number = telefone;
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
    } catch(error) {
      Alert.alert("SignUp Error: ", error.message);
      console.log(error.message);
      setLoading(false);
    }
  }

  async function authConfirmSignUp(email, code) {
    const username = email;
    const code = code;
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

  async function authResendConfirmationCode(email) {
    const username = email;
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

  async function authSignOut() {
    try {
      await Auth.signOut();
      setDbUser(null);
      setToken(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o logout. Tente novamente.');
    }
  }

  return(
    <AuthContext.Provider value={{ 
      signed:!!authUser, authUser, dbUser, token, loading, setDbUser,
      authSignIn, authSignUp, authConfirmSignUp, authResendConfirmationCode, authSignOut
    }}>
      {children}
    </AuthContext.Provider> 
  )
}

export const useAuthContext = () => useContext(AuthContext);

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
