import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/User/SignIn';
import SignUp from '../pages/User/SignUp';
import SignUpCode from '../pages/User/SignUpCode';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {

  return(
    <AuthStack.Navigator>

      <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
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
        name="SignUpCode"
        component={SignUpCode}
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
