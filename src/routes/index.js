import React from 'react';
import { View, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { authContext } from '../context/Auth';

import AppRoutes from './App.Routes';
import AuthRoutes from './Auth.Routes';

export default function Routes() {
  const { signed, loading } = authContext();
  console.log(signed); // !signed ? Alert.alert("Info", "User is not authenticated!") : Alert.alert("Info", "User signed.");

  if (loading) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size={50} color="#FFCC00"/>
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

