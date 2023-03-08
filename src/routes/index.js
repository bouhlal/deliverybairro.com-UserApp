/**
 * index.js (src/routes/index.js)
 */

import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

import AppRoutes from './App.Routes';
import AuthRoutes from './Auth.Routes';

export default function Routes() {
  const { signed, loading } = useContext(AuthContext);

  console.log("Usuário Autenticado? (signed): ", signed);

  if (loading) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0033CC' />
      </View>
    )
  }

  return (
    signed ? <AppRoutes /> : <AuthRoutes /> 
  );
}

const styles = StyleSheet.create({
  indicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
