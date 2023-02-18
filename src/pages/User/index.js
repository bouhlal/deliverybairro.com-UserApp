import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Auth } from "aws-amplify";
import { authContext } from '../../context/Auth';
import * as Location from 'expo-location';

import Header from '../../components/Header';

export default function Perfil() {
  const { user } = authContext();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState("");
  const [info, setInfo] = useState("");

  useEffect(() => {
    setInfo("Toque no botão para obter as coordenadas");
  }, []);

  useEffect(() => {
    if (errorMsg) {
      setInfo(errorMsg);
    } else if (location) {
      const i = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
      setInfo(i);
    }
  }, [location, errorMsg]);

  function getFormattedAddress({ endereco, numero, bairro, cidade, uf, cep }) {
    const formattedAddress = `${endereco}${numero ? `, ${numero}` : ''}, ${bairro}, ${cidade} - ${uf}, ${cep}`.replace(/ /g, '+');
    const f_address = `${endereco}${numero ? `, ${numero}` : ''}, ${bairro}, ${cidade} CEP ${uf}, ${cep}`;
    setAddress(f_address);
    console.log(address);
    return formattedAddress;
  };

  async function getCoordinates(data) {
    const apiKey = "AIzaSyAlhrqxSDSZUBvWgwz5Xh43tpnn3PcJj4M"; // proteger essa chave usando biblioteca dot.env
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${getFormattedAddress(data)}&key=${apiKey}`;

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
      await getCoordinates({ // assume que o objeto JSON é passado como o parâmetro `data`
        endereco: "Rua dos Comanches",
        numero: "870",
        bairro: "Santa Mônica",
        cidade: "Belo Horizonte",
        uf: "MG",
        cep: "31530-250",
      });
      getLocation();
    }
  };

  function LoadGPSbyAddress() {
    return (
      <View style={{justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.line18}>{user.attributes.email}</Text>
        <Text style={styles.line13}>{user.attributes.phone_number}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.line13}>{info}</Text>
      </View>
    );
  };

  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Dados do Usuário (Perfil)</Text>
        <LoadGPSbyAddress/>
        <TouchableOpacity style={styles.btnInfo} onPress={handleGetLocation} >
          <Text style={styles.btnTxt}>{!location ? 'OBTER NOVAMENTE' : 'OBTER COORDENADAS GPS'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnClose} onPress={() => Auth.signOut()} >
          <Text style={styles.btnTxt}>SAIR (LOGOUT)</Text>
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
  },
  address: {
    width: 300, 
    textAlign: "center", 
    color: '#000',
    fontSize: 13,
    marginBottom: 10,
    marginTop: 10
  },
  btnInfo: {
    width: '80%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  btnClose: {
    width: '80%',
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

// import LoadGPSbyAddress from './LoadGPSbyAddress';
// import LoadGPS from './LoadGPS';

// const { gps, error_msg } = LoadGPS();
// const { info, address, location, handleGetLocation } = LoadGPSbyAddress()

{/* 
        {(!gps) ? (
          <Text style={styles.line13}>{error_msg}</Text>
        ) : (
          <Text style={styles.line13}>
            Localização Atual (via GPS): ( {gps.coords.latitude} {gps.coords.longitude} )
          </Text>
        )} 
*/}
