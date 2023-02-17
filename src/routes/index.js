import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { authContext } from '../context/Auth';

import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';

export default function Routes() {
  const { user, loading } = authContext();
  // console.log(user);

  if (loading) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color="#000" />
      </View>
    )
  }
  // tratar msg 'The user is not authenticated'
  return (
    user ? <AppRoutes/> : <AuthRoutes/>
  )
}

const styles = StyleSheet.create({
  indicator:{
    flex:1, 
    position: 'absolute', 
    backgroundColor: '#000', 
    opacity: 0.7, 
    width: '100%', 
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'center'
  }
})

