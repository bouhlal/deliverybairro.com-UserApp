import React from 'react';
import { View, Text, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome5, Fontisto, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authContext } from '../../context/Auth';

import logo_png from '../../../assets/logo.png';

export default function SideBar({ props }) {
  const navigation = useNavigation();
  const { user, signOut } = authContext();
  
  function GoToLink(link) {
    return (
      navigation.navigate(link)
    )
  }

  return (
    <DrawerContentScrollView {...props}>

      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
        <Image source={logo_png} style={{ width: 120, height: 120 }} resizeMode="contain" />

        <Text style={{ color: '#5D5D5D', fontSize: 18, marginTop: 25 }}>Bem vindo!</Text>
        
        <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold'}}>{user.attributes.email}</Text>
        <Text style={{ color: '#000', fontSize: 13, marginBottom: 10 }}>{user.attributes.phone_number}</Text>
      </View>

      <DrawerItem
        label="HOME (Categorias)"
        onPress={() => GoToLink('Home')}
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <Entypo name='shop' size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <DrawerItem
        label="MINHAS COMPRAS (Pedidos)"
        onPress={() => GoToLink('Pedidos')}
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <Fontisto name='shopping-bag-1' size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <DrawerItem
        label="USUÁRIO (Perfil)"
        onPress={() => GoToLink('Perfil')}
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <FontAwesome5 name='user-cog' size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <DrawerItem
        label="SAIR (LogOut)"
        onPress={() => signOut}
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <FontAwesome5 name="door-open" size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
        <Text style={{ color: '#000', fontSize: 18 }}><AntDesign name="copyright" color='#000' size={12} /> 2022 PSI-SOFTWARE</Text>
        <Text style={{ color: '#000', fontSize: 14 }}>Direitos Reservados</Text>
      </View>

    </DrawerContentScrollView>
  );
}
