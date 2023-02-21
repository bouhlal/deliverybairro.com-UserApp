import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

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

/* 
import { LogBox } from "react-native";

console.disableYellowBox=true;
LogBox.ignoreLogs(['Warning: Possible Unhandled Promise Rejection (id: 1):']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
import OrderProvider from "./src/context/Order";
function App() {
  ...
export default withAuthenticator(App);
*/