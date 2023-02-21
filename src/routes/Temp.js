import React from 'react';
import { Alert } from 'react-native';
import { FontAwesome5, Fontisto, Entypo } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { authContext } from '../context/Auth';

import SideBar from '../components/SideBar';
import Categorias from '../pages/Categorias';
import Deliveries from '../pages/Deliveries';
import DeliveryInfo from '../pages/DeliveryInfo';
import CartInfo from '../pages/CartInfo';
import Pedidos from '../pages/Pedidos';
import Perfil from '../pages/User';

import OrderDetailsNavigator from './OrderDetailsNavigator';

const Stack = createStackNavigator();

export default function AppRoutes() {
  const { dbUser } = authContext();
  console.log(dbUser); // Alert.alert("UserID: ", dbUser.uid);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      { dbUser ? (
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Perfil" component={Perfil} />
      )}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: { height: 65 }, fontWeight: 'bold' }}
      barStyle={{ backgroundColor: "white" }}
    >
      <Tab.Screen // 1
        name='Home'
        component={ HomeStackNavigator }
        options={{
          tabBarIcon: ({ focused }) => {
            return <Entypo name='shop' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen // 2
        name='Pedidos'
        component={ OrderStackNavigator }
        options={{
          tabBarIcon: ({ focused }) => {
            return <Fontisto name='shopping-bag-1' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen // 3
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

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

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

const HomeStack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="DrawerNavigator" 
        component={DrawerNavigator} 
      />
      <HomeStack.Screen name="Home" component={Categorias} />
      <HomeStack.Screen name="Deliveries" component={Deliveries} />
      <HomeStack.Screen name="Delivery" component={DeliveryInfo}  options={{ headerShown: false }} />
      <HomeStack.Screen name="Cart" component={CartInfo} />
    </HomeStack.Navigator>
  );
};

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
