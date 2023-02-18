import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { authContext } from '../context/Auth';

import AuthRoutes from './Auth.Routes';
import AppRoutes from './App.Routes';

export default function Routes() {
  const { signed, loading } = authContext();
  // console.log(signed);
  // tratar msg 'The user is not authenticated'
  if (loading) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size='large' color='#131313'/>
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

