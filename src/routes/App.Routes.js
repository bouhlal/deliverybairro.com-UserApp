/**
 * App.Routes.js (src/routes/App.Routes.js)
 */

import React from 'react';
import { Entypo, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuthContext } from '../contexts/AuthContext';

import Home from '../pages/Home';
import Deliveries from '../pages/Deliveries';
import DeliveryInfo from '../pages/DeliveryInfo';
import CartInfo from '../pages/CartInfo';
import Pedidos from '../pages/Pedidos';
import OrderDetails from "../pages/Pedidos/_OrderDetails";
import OrderLiveUpdates from "../pages/Pedidos/_OrderLiveUpdates";
import OrderPayment from '../pages/Pedidos/_OrderPayment';
import Perfil from '../pages/User';

import SideBar from "../components/SideBar";

const Stack = createStackNavigator();

export default function AppRoutes() {
  const { dbUser } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      ) : (
        <Stack.Screen name="Perfil" component={Perfil} />
      )}
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { height: 65 }, fontWeight: 'bold' }}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen // Tab1
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Entypo name='shop' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen // Tab2
        name='Pedidos'
        component={OrderStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Fontisto name='shopping-bag-1' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen // Tab3
        name='Perfil'
        component={Perfil}
        options={{
          tabBarIcon: ({ focused }) => {
            return <FontAwesome5 name='user-cog' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
      />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Deliveries" component={Deliveries} />
      <HomeStack.Screen name="Delivery" component={DeliveryInfo} options={{ headerShown: false }} />
      <HomeStack.Screen name="Cart" component={CartInfo} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

const OrdersStack = createStackNavigator();

function OrderStackNavigator() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Pedidos" component={Pedidos} />
      <OrdersStack.Screen 
        name="Pedido"
        component={OrderDetailsNavigator} 
        screenOptions={{ headerShown: false }} 
      />
    </OrdersStack.Navigator>
  );
};

const OrderDetailsTopTab = createMaterialTopTabNavigator();

function OrderDetailsNavigator({ route }) {
  const id = route?.params?.id;
  return (
    <OrderDetailsTopTab.Navigator>

      <OrderDetailsTopTab.Screen 
        name="Detalhes do Pedido"
        options={{ headerShown: false }}
      >
        {() => <OrderDetails id={id} />}
      </OrderDetailsTopTab.Screen>

      <OrderDetailsTopTab.Screen 
        name="Atualizações" 
        options={{ headerShown: false }}
      >
        {() => <OrderLiveUpdates id={id} />}
      </OrderDetailsTopTab.Screen>

      <OrderDetailsTopTab.Screen 
        name="Pagamento" 
        options={{ headerShown: false }}
      >
        {() => <OrderPayment id={id} />}
      </OrderDetailsTopTab.Screen>

    </OrderDetailsTopTab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Categorias';
    switch (routeName) {
      case "Home": return "Home (Categorias)";
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
        component={HomeTabs}
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
