import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator, OrderStackNavigator, Perfil } from './App.Routes';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { height: 65 }, fontWeight: 'bold' }}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen // Tab1
        name='Home'
        component={ HomeStackNavigator }
        options={{
          tabBarIcon: ({ focused }) => {
            return <Entypo name='shop' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen // Tab2
        name='Pedidos'
        component={ OrderStackNavigator }
        options={{
          tabBarIcon: ({ focused }) => {
            return <Fontisto name='shopping-bag-1' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen // Tab3
        name='Perfil'
        component={ Perfil }
        options={{
          tabBarIcon: ({ focused }) => {
            return <FontAwesome5 name='user-cog' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
    </Tab.Navigator>
  );
}
