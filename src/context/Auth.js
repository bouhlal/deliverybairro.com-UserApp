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

  const token = user_authorized?.attributes?.sub; 

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthorized);
  }, [])

  useEffect(() => {
    DataStore.query(User, (usuario) => usuario.sub.eq(token)).then((usuarios) => {
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
      setMsgError(error.message);
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
