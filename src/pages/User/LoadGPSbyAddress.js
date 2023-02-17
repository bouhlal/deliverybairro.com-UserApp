import React, { useState } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';

export default function LoadGPSbyAddress() {
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
      <Text>{info}</Text>
      <Button title={location ? 'Obter novamente' : 'Obter coordenadas'} onPress={handleGetLocation} />
    </View>
  );
}
