import React from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { authContext } from '../context/Auth';

import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';

export default function Routes() {
  const { signed, loading } = authContext();  // tratar msg 'The user is not authenticated'
  Alert.alert("Is signed?", signed);

  if (loading) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size={100} color="#FF0000"/>
      </View>
    )
  }

  return (
    signed ? <AppRoutes/> : <AuthRoutes/>
  )
}

const styles = StyleSheet.create({
  indicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

