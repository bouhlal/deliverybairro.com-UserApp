import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import { authContext } from '../../context/Auth';
import { Auth } from "aws-amplify";

import Header from '../../components/Header';
import LoadGPS from './LoadGPS';

export default function Perfil() { 
  const { user } = authContext();
  const { gps, error_msg } = LoadGPS();

  function LoadGPSbyAddress() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    async function getCoordinates() {
      const { endereco, numero, bairro, cidade, cep, uf } = {
        endereco: 'Rua dos Comanches',
        numero: '870',
        bairro: 'Santa Mônica',
        cidade: 'Belo Horizonte',
        cep: '31530-250',
        ...data, // assume que o objeto JSON é passado como o parâmetro `data`
      };
      const formattedAddress = `${endereco}${numero ? `, ${numero}` : ''}, ${bairro}, ${cidade} - ${uf}, ${cep}`.replace(/ /g, '+');
      const apiKey = 'AIzaSyAlhrqxSDSZUBvWgwz5Xh43tpnn3PcJj4M'; // proteger essa chave usando biblioteca dot.env
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ latitude: lat, longitude: lng });
      } catch (error) {
        setErrorMsg('Erro ao obter as coordenadas');
      }
    };
  
    async function getLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }
  
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    };
  
    async function handleGetLocation() {
      if (location) {
        setLocation(null);
      } else {
        await getCoordinates();
        getLocation();
      }
    };
  
    let info = 'Toque no botão para obter as coordenadas';
    if (errorMsg) {
      info = errorMsg;
    } else if (location) {
      info = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.line18}>{formattedAddress}</Text>
        <Text style={styles.line13}>{info}</Text>
        <TouchableOpacity style={styles.btnCoordenadasXY} onPress={handleGetLocation} >
          <Text style={styles.btnTxt}>{location ? 'Obter novamente' : 'Obter coordenadas'}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Dados do Usuário (Perfil)</Text>
        <Text style={styles.line18}>{user.attributes.email}</Text>
        <Text style={styles.line13}>{user.attributes.phone_number}</Text>
        <LoadGPSbyAddress/>
        {(error_msg) ? (
          <Text style={styles.line13}>{error_msg}</Text>
        ) : (
          <Text style={styles.line13}>
            Localização Atual (via GPS): ( {gps.coords.latitude} {gps.coords.longitude} )
          </Text>
        )}
        <TouchableOpacity style={styles.btnClose} onPress={() => Auth.signOut()} >
          <Text style={styles.btnTxt}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: "#FFF",
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title:{ 
    color: '#5D5D5D',
    fontSize: 18,
    marginTop: 25
  },
  subtitle:{
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold'
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
  btnCoordenadasXY: {
    width: '50%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#FFB901 ',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnClose: {
    width: '50%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnTxt:{
    color: "#FFF", 
    textAlign: "center", 
  },
})

/**
*/