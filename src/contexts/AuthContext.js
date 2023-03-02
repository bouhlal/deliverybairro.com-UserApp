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
  const [authUser, setAuthUser] = useState({});
  const [dbUser, setDbUser] = useState(null);

  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  useEffect(() => {
    if (authUser) { // verificação adicionada aqui
      DataStore.query(User, (user) => user.token.eq(sub)).then((users) =>
        setDbUser(users[0])
      );
    }
  }, [authUser, sub]);

  async function authSignIn(email, password) {
    setLoading(true);
    const username = email;
    try {
      const user = await Auth.signIn(username, password);
      console.log(user);
      setAuthUser(user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível realizar o login. Verifique suas credenciais e tente novamente.');
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
      console.log(user);
      setAuthUser(user);
      setLoading(false);
    } catch(error) {
      Alert.alert("SignUp Error: ", error.message);
      console.log(error.message);
      setLoading(false);
    }
  }

  async function authConfirmSignUp(email, code) {
    const username = email;
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
      setAuthUser({});
      setDbUser(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível realizar o logout. Tente novamente.');
    }
  }

  return(
    <AuthContext.Provider value={{ 
      signed:!!dbUser, authUser, dbUser, sub, setDbUser,
      authSignIn, authSignUp, authConfirmSignUp, authResendConfirmationCode, authSignOut
    }}>
      {children}
    </AuthContext.Provider> 
  )
}

export const useAuthContext = () => useContext(AuthContext);
