import { useState } from 'react';
import * as Location from 'expo-location';

import { GOOGLE_APIKEY } from '@env';

export default function LoadGPSbyAddress() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [info, setInfo] = useState("");
  const [address, setAddress] = useState("");

  async function getCoordinates() {
    const { endereco, numero, bairro, cidade, cep, uf } = {
      endereco: "Rua dos Comanches",
      numero: "870",
      bairro: "Santa Mônica",
      cidade: "Belo Horizonte",
      uf: "MG",
      cep: "31530-250",
      ...data, // assume que o objeto JSON é passado como o parâmetro `data`
    };

    const formattedAddress = `${endereco}${numero ? `, ${numero}` : ''}, ${bairro}, ${cidade} - ${uf}, ${cep}`.replace(/ /g, '+');
    const address_formatated = endereco+", "+numero+", "+bairro+", "+cidade+"/"+uf+" CEP "+cep;
    console.log(address_formatated); setAddress(address_formatated);

    const apiKey = GOOGLE_APIKEY; 
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

  setInfo("Toque no botão para obter as coordenadas");

  if (errorMsg) {
    setInfo(errorMsg);
  } else if (location) {
    setInfo(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
  }

  return (
    { info, address, location, handleGetLocation }
  )
}
