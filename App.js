import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthProvider from "./src/context/Auth";
import Routes from './src/routes';

import { Amplify } from "aws-amplify";
import awsconfig from "./src/aws-exports";

Amplify.configure({
  ...awsconfig, 
  Analytics: {
    disabled: true
  },
});

LogBox.ignoreLogs(['Warning: Possible Unhandled Promise Rejection']);
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="dark" />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

// import { withAuthenticator } from "aws-amplify-react-native/dist/Auth";
// import AuthProvider  from "./src/context/Auth";
// import CartProvider  from "./src/context/Cart";
// import OrderProvider from "./src/context/Order";
// import RootNavigator from "./src/navigation";

// function App() {

// export default withAuthenticator(App);
