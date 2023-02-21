import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideBar from "../components/SideBar";

import { TabNavigator } from './App.Routes';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
      case "Home": return "Categorias";
      case "Deliveries": return "Deliverys perto de Você"
      case "DeliveryInfo": return "Delivery (Produtos)"
      case "CartInfo": return "Minhas Compras";
      case "Pedidos": return "Meus Pedidos"
      case "Perfil": return 'Dados do Usuário';
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <SideBar {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: '#FFF',
          width: '70%',
          marginTop: 82,
          marginBotton: 5,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
        },
        drawerLabelStyle: {
          fontWeight: 'bold'
        },
        drawerItemStyle: {
          activeTintColor: '#FFF',
          activeBackgroundColor: '#FF0000',
          inactiveTintColor: '#5D5D5D',
          inactiveBackgroundColor: '#000',
          marginVertical: 5
        },
      }}
    >
      <Drawer.Screen
        name="Delivery Bairro"
        component={TabNavigator}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
          },
          tabBarIcon: {
            color: '#000'
          }
        })}
      />
    </Drawer.Navigator>
  );
}
