/**
 * DeliveryBairro UserApp - App.js
 */

import 'react-native-gesture-handler';
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthContextProvider from './src/contexts/AuthContext';
import Routes from './src/routes/index';

LogBox.ignoreLogs(['Warning: ...']);

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure({
  ...awsconfig, 
  Analytics: {
    disabled: true
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StatusBar style="light" />
        <Routes/>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

/**
import CartContextProvider from './src/contexts/CartContext';
import OrderContextProvider from './src/contexts/OrderContext';

        <CartContextProvider>
          <OrderContextProvider> 

          </OrderContextProvider>
        </CartContextProvider> 

        // function App() {
// import { withAuthenticator } from 'aws-amplify-react-native';
// export default withAuthenticator(App);
*/