/**
 * AuthContext.js (src/contexts/AuthContext.js)
 */

import React, { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [dbUser, setDbUser] = useState(null);

  const usr_token = authUser?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  // useEffect(() => {
  //   DataStore.query(User, (user) => user.token.eq(usr_token)).then((users) =>
  //     setDbUser(users[0])
  //   );
  // }, [usr_token]);

  useEffect(() => {
    if (authUser) { // verificação adicionada aqui
      DataStore.query(User, (user) => user.token.eq(usr_token)).then((users) =>
        setDbUser(users[0])
      );
    }
  }, [authUser, usr_token]);

  async function authSignIn(email, password) {
    setLoading(true);
    const username = email;
    try {
      const user = await Auth.signIn(username, password);
      setLoading(false);
      setAuthUser(user);
      console.log(user);
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível realizar o login. Verifique suas credenciais e tente novamente.');
      console.log(error);
    }
  }

  async function authSignUp(email, password, telefone) {
    const username = email;
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
      setLoading(false);
      setAuthUser(user);
      console.log(user);
    } catch(error) {
      setLoading(false);
      Alert.alert("SignUp Error: ", error.message);
      console.log(error.message);
    }
  }

  async function authSignOut() {
    try {
      // await Auth.signOut({ global: true });
      await Auth.signOut();
      setAuthUser({});
      setDbUser(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível realizar o logout. Tente novamente.');
      console.error(error);
    }
  }

  async function authResendConfirmationCode(email) {
    const username = email;
    setLoading(true);
    try {
      const { user } =  await Auth.resendSignUp(username);
      setLoading(false);
      Alert.alert("Info",`Código reenviado com sucesso! Confira novamente o email enviado para: ${user.email}`);
      console.log('Código reenviado com sucesso.');
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possivel reenviar o código de verificação. Tente novamente.");
      console.log(error);
    }
  }

  async function authConfirmSignUp(email, code) {
    const username = email;
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, code);
      setLoading(false);
      Alert.alert("Info",`Código enviado com sucesso! Confira o email enviado para: ${username}`);
      console.log("Confirmation Code is send to: ", username);
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possivel enviar o código de verificação. Tente novamente.");
      console.log(error);
    }
  }

  return(
    <AuthContext.Provider value={{ 
      signed: !!authUser, dbUser, authUser, loading, usr_token,
      authSignIn, authSignUp, authSignOut, authConfirmSignUp, authResendConfirmationCode
    }}>
      {children}
    </AuthContext.Provider> 
  )
}

export default AuthContextProvider;
