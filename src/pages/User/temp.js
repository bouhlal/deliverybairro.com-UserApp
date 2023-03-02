/**
 * index.js (src/pages/User/index.js)
 */

import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../../models';
import Header from '../../components/Header';

export default function Perfil() {
  const { dbUser, setDbUser, sub } = useAuthContext();
  const navigation = useNavigation();

  const [nome, setNome] = useState(dbUser?.nome || '');
  const [sobrenome, setSobrenome] = useState(dbUser?.sobrenome || '');
  const [url_foto, setUrlFoto] = useState(dbUser?.url_foto || '');
  const [latitude, setLatitude] = useState(dbUser?.latitude || '0');
  const [longitude, setLongitude] = useState(dbUser?.longitude || '0');
  const [error_msg, setErrorMsg] = useState(null);
  const [info, setInfo] = useState('');
  const [gps, setGps] = useState(null);

  async function onSave() {
    try {
      if (dbUser) {
        await updateUser();
      } else {
        await createUser();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  async function updateUser() {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.nome = nome;
          updated.sobrenome = sobrenome;
          updated.url_foto = url_foto;
          updated.latitude = parseFloat(latitude);
          updated.longitude = parseFloat(longitude);
        })
      );
      setDbUser(user);
    } catch (error) {
      throw new Error(`Não foi possível atualizar o usuário. ${error.message}`);
    }
  }

  async function createUser() {
    try {
      const user = await DataStore.save(
        new User({
          nome,
          sobrenome,
          url_foto: null,
          token: sub,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        })
      );
      setDbUser(user);
      Alert.alert(
        'Sucesso',
        `Dados do Usuário cadastrados com sucesso! ID: ${user.id}`
      );
    } catch (error) {
      throw new Error(`Não foi possível criar o usuário. ${error.message}`);
    }
  }

  async function getLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      const info = `(latitude: ${latitude}, longitude: ${longitude})`;
      setInfo(info);
    } catch (error) {
      console.error(error);
    }
  }
  
    return (
    <View style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
      <Header/>
      <Text style={styles.title}>DADOS DO USUÁRIO (PERFIL)</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Nome:</Text>
          <TextInput 
            value={nome}
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="true"
            onChangeText={(input) => setNome(input)}
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Sobrenome:</Text>
          <TextInput
            value={sobrenome}
            placeholder="Sobrenome"
            autoCapitalize="true"
            onChangeText={(input) => setSobrenome(input)}
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>FOTO (LINK/URL):</Text>
          <TextInput
            value={url_foto}
            placeholder="URL da foto"
            onChangeText={(input) => setUrlFoto(input)}
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Latitude:</Text>
          <TextInput
            value={latitude}
            placeholder="-19.82711"
            onChangeText={(input) => setLatitude(input)}
            keyboardType='numeric'
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Longitude:</Text>
          <TextInput
            value={longitude}
            placeholder="-43.98319"
            onChangeText={(input) => setLongitude(input)}
            keyboardType='numeric'
            style={styles.input}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.btnSubmit, {marginTop: 15}]} onPress={onSave}>
        <Text style={styles.btnTxt}>{(!dbUser) ? "SALVAR" : "ATUALIZAR"} DADOS</Text>
      </TouchableOpacity>

      <Text style={{fontSize: 13, textAlign: "center"}}>{info}</Text>

      <TouchableOpacity style={styles.btnSubmit} onPress={() => getLocation()} >
        <Text style={styles.btnTxt}>OBTER COORDENADAS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogout} onPress={() => Auth.signOut()} >
        <Text style={styles.btnTxt}>SAIR (LOGOUT)</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    paddingVertical: 25,
    // padding: 10
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  content: {
    width: '98%',
    paddingHorizontal: 10,
  },
  title:{ 
    color: '#000',
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 21,
  },
  subtitle:{
    color: '#000',
    textAlign: "center",
    fontSize: 15,
  },
  line18:{ 
    color: '#000', 
    fontSize: 18 
  },
  line13:{
    color: '#000',
    fontSize: 13,
  },
  areaInput:{
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
  },
  input:{
    flex: 1, 
    width: "98%",
    height: 45,
    padding: 10,
    backgroundColor: "#FFF",
    borderColor: "#8CB8D2",
    borderWidth: 1,
    borderRadius: 7,
    fontSize: 17,
    color: "#000",
  },
  btnSubmit:{
    width: "95%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    margin: 10,
  },
  btnLogout: {
    width: '95%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  btnTxt:{
    color: "#FFF", 
    fontSize: 20,
    textAlign: "center", 
  },
  link: {
    marginTop: 10,
    marginBottom: 10,
  },
  linkTxt:{
    textAlign: "center",
    color: "#000",
  }
})
