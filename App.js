import 'react-native-gesture-handler';
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { withAuthenticator } from 'aws-amplify-react-native';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
// Amplify.configure(awsconfig);
Amplify.configure({
  ...awsconfig, 
  Analytics: {
    disabled: true
  },
});

import AuthContextProvider from './src/contexts/AuthContext';
// import CartContextProvider from './src/contexts/CartContext';
// import OrderContextProvider from './src/contexts/OrderContext';

LogBox.ignoreLogs(['Warning: ...']);

import Routes from './src/routes/index';

export default function App() {
// function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        {/* 
        <CartContextProvider>
          <OrderContextProvider> 
        */}
            <StatusBar style="light" />
            <Routes/>
        {/* 
          </OrderContextProvider>
        </CartContextProvider> 
        */}
      </AuthContextProvider>
    </NavigationContainer>
  );
}

// import { withAuthenticator } from 'aws-amplify-react-native';
// export default withAuthenticator(App);
