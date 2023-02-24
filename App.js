import 'react-native-gesture-handler';
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { withAuthenticator } from 'aws-amplify-react-native';
import { Amplify } from "aws-amplify";
import awsconfig from './src/aws-exports';

import AuthProvider from "./src/context/Auth";
import Routes from './src/routes/index';

Amplify.configure({
  ...awsconfig, 
  Analytics: {
    disabled: true
  },
});

LogBox.ignoreLogs(['Warning: ...']);

function App() {

  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="light" />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);


/** 
import React, { useEffect } from 'react';
import { Amplify, Hub } from "aws-amplify";
import CartProvider from "./src/context/Cart";

Hub.configure(config);

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

    <NavigationContainer>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider theme={studioTheme}>
            // <StatusBar backgroundColor='#FFF' barStyle='dark-content' />
            <StatusBar style="light" />
            <Routes/>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </NavigationContainer>

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

*/

// import { withAuthenticator } from 'aws-amplify-react-native';
// export default withAuthenticator(App);
