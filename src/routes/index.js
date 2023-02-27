/**
 * index.js (src/routes/index.js)
 */
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';

import AppRoutes from './App.Routes';
import AuthRoutes from './Auth.Routes';

export default function Routes() {
  const { token, loading } = useAuthContext();

  if (loading) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size={50} color="#FF0000"/>
      </View>
    )
  }

  return (
    token ? <AppRoutes/> : <AuthRoutes/>
  );
}

const styles = StyleSheet.create({
  indicator:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
