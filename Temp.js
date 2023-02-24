// ref.:
// https://stackoverflow.com/questions/50859539/is-it-possible-to-customize-default-sign-up-sign-in-screens-of-aws-amplify-reac
// customize default Sign Up, Sign In screens of aws-amplify-react-native package
// ***
import 'react-native-gesture-handler';
import { StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { 
  withAuthenticator, 
  SignUp, 
  ConfirmSignIn, 
  ConfirmSignUp, 
  ForgotPassword, 
  VerifyContact, 
  Greetings,  
  Loading,  
  RequireNewPassword
} from 'aws-amplify-react-native';

import { 
  Authenticator, 
  ConfirmSignUp, //<----- customized authenticator component
  SignUp, //<----- customized authenticator component
  SignIn //<----- customized authenticator component
} from './scr/pages/User';

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

export default withAuthenticator(App, false, 
  [
    <Loading />
    <SignIn />  // customized authenticator component */
    <ConfirmSignIn />  
    <VerifyContact />
    <SignUp /> // customized authenticator component
    <ConfirmSignUpScreen />  // customized authenticator component
    <ForgotPassword />
    <RequireNewPassword />
    <Greetings />
  ]);