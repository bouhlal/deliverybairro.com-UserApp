// import React from 'react';
import AppRoutes from './App.Routes';

export default function Routes() {
  return(
    <AppRoutes />
  )
}

/*
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { authContext } from '../context/Auth';

import AppRoutes from './App.Routes';
import AuthRoutes from './Auth.Routes';

export default function Routes() {
  const { dbUser, loading } = authContext();

  if (loading) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size={50} color="#FFCC00"/>
      </View>
    )
  }

  return (
    dbUser ? <AppRoutes/> : <AuthRoutes/>
  )
}

const styles = StyleSheet.create({
  indicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
**/
  // import { useState, useEffect } from 'react';
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  
  // const [dbUser, setDbUser] = useState(null);
  
  // useEffect(() => {
  //   async function loadStorage() {
  //     const storageUser = await AsyncStorage.getItem('Auth_user');
  //     if (storageUser) {
  //       setDbUser(JSON.parse(storageUser));
  //     }
  //     setLoading(false);
  //   }
  //   loadStorage();
  // }, []);
