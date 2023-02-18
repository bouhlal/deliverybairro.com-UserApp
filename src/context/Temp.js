import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

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
      alert(error.message);
      setLoadingAuth(false);
    }
  }

  async function signUp(email, password, nome) {
    setLoadingAuth(true);
    try {
      await Auth.signUp({ username: email, password, attributes: { email, name: nome } });
      const userData = { uid: email, email };
      setUser(userData);
      storageUser(userData);
      setLoadingAuth(false);
    } catch (error) {
      alert(error.message);
      setLoadingAuth(false);
    }
  }

  async function confirmSignUp(email, code) {
    try {
      await Auth.confirmSignUp(email, code);
    } catch (error) {
      alert(error.message);
    }
  }

  async function resendSignUp(email) {
    try {
      await Auth.resendSignUp(email);
    } catch (error) {
      alert(error.message);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      alert(error.message);
    }
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
  }

  return(
    <AuthContext.Provider value={{ signed: !!user, user, loading, loadingAuth, signIn, signUp, confirmSignUp, resendSignUp, signOut }}>
      {children}
    </AuthContext.Provider> 
  )
}

export default AuthProvider;
