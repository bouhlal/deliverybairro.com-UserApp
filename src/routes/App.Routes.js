/**
 * App.Routes.js (src/routes/App.Routes.js)
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { FontAwesome5, Fontisto, Entypo } from '@expo/vector-icons';

import Home from '../pages/Home';
import Deliveries from '../pages/Deliveries';
import DeliveryInfo from '../pages/DeliveryInfo';
import CartInfo from '../pages/CartInfo';
import Pedidos from '../pages/Pedidos';
import OrderDetails from "../pages/Pedidos/_OrderDetails";
import OrderLiveUpdates from "../pages/Pedidos/_OrderLiveUpdates";
import OrderPayment from '../pages/Pedidos/_OrderPayment';
import Perfil from '../pages/User';

import SideBar from '../components/SideBar';

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
};

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { height: 65 },
        fontWeight: 'bold',
        headerShown: false,
      }}

    >
      <Tab.Screen
        name='Home'
        component={ HomeStackNavigator }
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return <Entypo name='shop' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen
        name='OrderTabs'
        component={ OrderStackNavigator }
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return <Fontisto name='shopping-bag-1' color={(focused !== true) ? '#5D5D5D' : '#000'} size={35} />
          }
        }}
      />
      <Tab.Screen
        name='Perfil'
        component={ Perfil }
        options={{
          tabBarIcon: ({ color, size, focused }) => {
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
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen 
        name="DrawerNavigator"
        component={DrawerNavigator}
      />
      <HomeStack.Screen name="Home" component={ Home } options={{ headerShown: false, headerTitle: 'Categorias' }} />
      <HomeStack.Screen name="Deliveries" component={ Deliveries } options={{ headerShown: true, headerTitle: 'Deliveries' }} />
      <HomeStack.Screen name="DeliveryInfo" component={ DeliveryInfo } options={{ headerShown: true, headerTitle: 'Delivery' }} />
      <HomeStack.Screen name="CartInfo" component={ CartInfo } options={{ headerShown: true, headerTitle: 'Cesta de Compras' }} />
    </HomeStack.Navigator>
  );
}

const OrdersStack = createStackNavigator();

function OrderStackNavigator() {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen name="Pedidos" component={ Pedidos } options={{ headerShown: true, headerTitle: 'Meus Pedidos' }} />
      <OrdersStack.Screen name="OrderDetails" component={ OrderDetails } options={{ headerShown: true, headerTitle: 'Detalhes do Pedido' }} />
      <OrdersStack.Screen name="OrderLiveUpdates" component={ OrderLiveUpdates } options={{ headerShown: true, headerTitle: 'Atualizações do Pedido (status)' }} />
      <OrdersStack.Screen name="OrderPayment" component={ OrderPayment } options={{ headerShown: true, headerTitle: 'Pagamento do Pedido' }} />
    </OrdersStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
      case 'Home': return 'Categorias (Home)';
      case 'Deliveries': return 'Lista de Deliveries (Categoria)';
      case 'DeliveryInfo': return 'Detalhes do Delivery';
      case 'CartInfo': return 'Minha Cesta de Compras'
      case 'Pedidos': return 'Meus Pedidos';
      case 'OrderDetails': return 'Detalhes do Pedido';
      case 'OrderLiveUpdates': return 'Atualizações do Pedido';
      case 'OrderPayment': return 'Pagamento do Pedido';
      case 'Perfil': return 'Perfil (Dados do Usuário)';
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
          marginTop: 5,
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

/**
 * tabela de cores: #FFB901 #55A9D6 #7F7B7B #5D5D5D #FF0000 #0033CC #FFF000 #131313 #4DCE4D
 */
