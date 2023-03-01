/**
 * Auth.Routes.js (src/routes/Auth.Routes.js)
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CustomSignIn from '../pages/User/_SignIn';
import CustomSignUp from '../pages/User/_SignUp';
import CustomSignUpCode from '../pages/User/_SignUpCode';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {

  return(
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="CustomSignIn"
        component={CustomSignIn}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name="CustomSignUp"
        component={CustomSignUp}
        options={{
          headerStyle:{
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
          headerTitle: 'Voltar',
        }}
      />
      <AuthStack.Screen
        name="CustomSignUpCode"
        component={CustomSignUpCode}
        options={{
          headerStyle:{
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
          headerTintColor: '#FFF',
          headerBackTitleVisible: false,
          headerTitle: 'Voltar',
        }}
      />
    </AuthStack.Navigator>
  )
}
