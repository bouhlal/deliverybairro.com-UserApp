import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome5, Fontisto, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { authContext } from '../../context/Auth';

import logo_png from '../../../assets/logo.png';

export default function SideBar({ props }) {
  const navigation = useNavigation();
  const { dbUser, signOut } = authContext();

  function GoToLink(link) {
    return (
      navigation.navigate(link)
    )
  }

  return (
    <DrawerContentScrollView {...props}>

      <View style={styles.hearder}>
        <Image style={styles.logo} source={logo_png} resizeMode="contain" />
        <Text style={styles.title}>Bem vindo!</Text>
        <Text style={styles.subtitle}>{dbUser?.attributes?.given_name} {dbUser?.attributes.family_name}</Text>
        <Text style={styles.line13}>{dbUser?.attributes?.email}</Text>
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
        onPress={() => signOut()}
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <FontAwesome5 name="door-open" size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
        <Text style={styles.line18}><AntDesign name="copyright" color='#000' size={12} /> 2022 PSI-SOFTWARE</Text>
        <Text style={styles.line13}>Direitos Reservados</Text>
      </View>

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  hearder:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  logo:{ 
    width: 120, 
    height: 120 
  },
  title:{ 
    color: '#5D5D5D',
    fontSize: 18,
    marginTop: 25
  },
  subtitle:{
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    // marginBottom: 20
  },
  line18:{ 
    color: '#000', 
    fontSize: 18 
  },
  line13:{
    color: '#000',
    fontSize: 13,
    marginBottom: 10
  },
});
