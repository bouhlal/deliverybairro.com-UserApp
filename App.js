/**
 * DeliveryBairro UserApp - App.js
 */

import 'react-native-gesture-handler';
import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar} from 'expo-status-bar';

console.disableYellowBox=true;

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure({
  ...awsconfig, 
  Analytics: {
    disabled: true
  },
});

import AuthContextProvider from './src/contexts/AuthContext';
// import CartContextProvider from './src/contexts/CartContext';
// import OrderContextProvider from './src/contexts/OrderContext';
import Routes from './src/routes/index';

LogBox.ignoreLogs(['Warning: ...']);

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        {/* <CartContextProvider>
          <OrderContextProvider>  */}
            <StatusBar backgroundColor='#FFF' barStyle='dark-content'  />
            <Routes/>
          {/* </OrderContextProvider>
        </CartContextProvider>  */}
      </AuthContextProvider>
    </NavigationContainer>
  );
}

/**
function App() {
import { withAuthenticator } from 'aws-amplify-react-native';
export default withAuthenticator(App);
*/