import { useState } from 'react';
import * as Location from 'expo-location';

import { GOOGLE_APIKEY } from '@env';

export default function LoadGPSbyAddress({ props }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [info, setInfo] = useState("");
  const [address, setAddress] = useState("");

  async function getCoordinates() {
    const { endereco, complemento, bairro, cidade, cep, uf } = {
      endereco: props.endereco,
      complemento: props.complemento,
      bairro: props.bairro,
      cidade: props.cidade,
      uf: props.uf,
      cep: props.cep,
      ...data, // assume que o objeto JSON é passado como o parâmetro `data`
    };

    const formattedAddress = `${endereco}${complemento ? `, ${complemento}` : ''}, ${bairro}, ${cidade} - ${uf}, ${cep}`.replace(/ /g, '+');
    const address_formatated = endereco+", "+complemento+", "+bairro+", "+cidade+"/"+uf+" CEP "+cep;
    console.log("Endereço formatado: ", address_formatated); setAddress(address_formatated);

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{address}</Text>
      <Text>{info}</Text>
      <Button title={location ? 'Obter novamente' : 'Obter coordenadas'} onPress={handleGetLocation} />
    </View>
    // { info, address }
  )
}
