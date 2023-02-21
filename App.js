import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

LogBox.ignoreLogs(['Warning: ...']);

import AuthProvider from "./src/context/Auth";
import CartProvider from "./src/context/Cart";
import Routes from './src/routes/index';

import Amplify, { Hub } from "aws-amplify";
import awsconfig from "./src/aws-exports";

Amplify.configure({
  ...awsconfig, 
  Analytics: {
    disabled: true
  },
});

Hub.configure(awsconfig);

export default function App() {

  useEffect(() => {
    function listenToAutoSignInEvent() {
      Hub.listen('auth', ({ payload }) => {
        const { event } = payload;
        if (event === 'autoSignIn') {
          const user = payload.data;
          console.log('Usuário fez login automaticamente:', user);
          // Realize as ações necessárias quando o usuário faz login automaticamente
        } else if (event === 'autoSignIn_failure') {
          console.log('Falha ao fazer login automático');
          // Realize as ações necessárias em caso de falha ao fazer login automático
        }
      });
    }
    listenToAutoSignInEvent();
  }, []);
  
  return (
    <NavigationContainer>
      <AuthProvider>
        <CartProvider> 
          <StatusBar style="light" />
          <Routes/>
        </CartProvider> 
      </AuthProvider>
    </NavigationContainer>
  );
}

// Ignore log notification by message:
// LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
// LogBox.ignoreAllLogs();
