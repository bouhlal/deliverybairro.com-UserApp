import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Keyboard, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Background, Container } from './styles';
import { TextInputMask } from 'react-native-masked-text';

import { authContext } from '../../context/Auth';
import { DataStore } from 'aws-amplify';
import { User } from '../../models';

import * as Location from 'expo-location';
import { GOOGLE_APIKEY } from '@env';

import Header from '../../components/Header';

export default function Perfil() {
  const { sub, dbUser, setDbUser, signOut } = authContext();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [url_foto, setUrlFoto] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const [errorMsg, setErrorMsg] = useState(null);
  const [info, setInfo] = useState("Toque no botão para obter as coordenadas");

  async function getCoordinates() {
    const apiKey = GOOGLE_APIKEY; 
    const formattedAddress = `${endereco}${complemento ? `, ${complemento}` : ''}, ${bairro}, ${cidade} - ${uf}, ${cep}`.replace(/ /g, '+');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      console.log(data.results[0]);
      setLatitude(lat);
      setLongitude(lng);
    } catch (error) {
      setErrorMsg('Erro ao obter as coordenadas');
    }
  };

  async function getLocation() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    } catch (error) {
      setErrorMsg('Erro ao obter a localização');
    }
  }

  async function loadGpsByAddress() {
    if (!latitude || !longitude) {
      await getCoordinates();
      getLocation();
    } else {
      setLatitude(0);
      setLongitude(0);
    }
  };

  async function createUser() {
    try {
      const enderecoObj = { endereco, complemento, bairro, cidade, cep };
      const user = await DataStore.save(
        new User({
          "nome": nome,
          "sobrenome": sobrenome,
          "telefone": telefone,
          "email": email,
          "endereco": enderecoObj,
          "uf": uf,
          "url_foto": null,
          "latitude": latitude,
          "longitude": longitude,
          "token": sub,
          "Baskets": [],
          "Pedidos": []
        })
      );
      setDbUser(user);
      Alert.alert('Sucesso', `Dados do Usuário cadastrados com sucesso! ID: ${user.id}`);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  async function updateUser() {
    try {
      const current = await DataStore.query(User, dbUser.id);
      const enderecoObj = { endereco, complemento, bairro, cidade, cep };
      const updated = await DataStore.save(User.copyOf(current, 
        item => {
          item.nome = nome, 
          item.sobrenome = sobrenome, 
          item.telefone = telefone, 
          item.email = email, 
          item.endereco = enderecoObj, 
          item.uf = uf, 
          item.url_foto = url_foto,
          item.latitude = latitude,
          item.longitude = longitude
        }
      ));
      setDbUser(updated);
      Alert.alert('Sucesso', `Dados do Usuário atualizados com sucesso! ID: ${dbUser.id}`);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  useEffect(() => {
    if (errorMsg) {
      setInfo(errorMsg);
    } else {
      setInfo(`Localização Atual (${latitude}, ${longitude})`);
    }
  }, [errorMsg, latitude, longitude])

  function maskEditPhone(formatted, extracted) {
    setTelefone(extracted);
  }

  function maskEditCep(formatted, extracted) {
    setCep(extracted);
  }

  return (
    <Background>
      <Container>
        <Header/>
        <Text style={styles.title}>DADOS DO USUÁRIO (PERFIL)</Text>
        <ScrollView contentContainerStyle={{width: "100%"}}>
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
            <Text style={{marginBottom: 5}}>Email:</Text>
            <TextInput 
              value={email} 
              placeholder="Email" 
              autoCapitalize="false"
              onChangeText={(input) => setEmail(input)} 
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Telefone:</Text>
            <TextInputMask
              value={telefone}
              placeholder="+55 31 99999-9999"
              type={'custom'}
              options={{
                mask: '+55 99 99999-9999',
              }}
              onChangeText={maskEditPhone}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Endereco:</Text>
            <TextInput
              value={endereco}
              placeholder="Endereco"
              onChangeText={(input) => setEndereco(input)}
              autoCapitalize='true'
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Complemento:</Text>
            <TextInput
              value={complemento}
              placeholder="Complemento"
              onChangeText={(input) => setComplemento(input)}
              autoCapitalize='true'
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Bairro:</Text>
            <TextInput
              value={bairro}
              placeholder="Bairro"
              onChangeText={(input) => setBairro(input)}
              autoCapitalize='true'
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>Cidade:</Text>
            <TextInput
              value={cidade}
              placeholder="cidade"
              onChangeText={(input) => setCidade(input)}
              onSubmitEditing={() => Keyboard.dismiss()}
              autoCapitalize='true'
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>UF:</Text>
            <TextInput
              value={uf}
              placeholder="UF"
              onChangeText={(input) => setUf(input)}
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>CEP:</Text>
            <TextInputMask
              value={telefone}
              placeholder="99999-999"
              type={'custom'}
              options={{
                mask: '99999-999',
              }}
              onChangeText={maskEditCep}
              keyboardType="numeric"
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
            <Text style={{marginBottom: 5}}>LATITUDE:</Text>
            <TextInput
              value={latitude}
              placeholder="-19.82711"
              onChangeText={(input) => setLatitude(input)}
              keyboardType='numeric'
              style={styles.input}
            />
          </View>
          <View style={styles.areaInput}>
            <Text style={{marginBottom: 5}}>LONGITUDE:</Text>
            <TextInput
              value={longitude}
              placeholder="-43.98319"
              onChangeText={(input) => setLongitude(input)}
              keyboardType='numeric'
              style={styles.input}
            />
          </View>
        </ScrollView>

        { !dbUser ? (
          <TouchableOpacity style={[styles.btnSubmit, {marginTop: 15}]} onPress={() => createUser()}>
            <Text style={styles.btnTxt}>SALVAR DADOS</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnSubmit} onPress={() => updateUser()}>
            <Text style={styles.btnTxt}>ATUALIZAR DADOS</Text>
          </TouchableOpacity>
        )}

        <Text style={{fontSize: 13, textAlign: "center"}}>{info}</Text>

        <TouchableOpacity style={styles.btnSubmit} onPress={loadGpsByAddress} >
          <Text style={styles.btnTxt}>OBTER COORDENADAS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogout} onPress={() => signOut()} >
          <Text style={styles.btnTxt}>SAIR (LOGOUT)</Text>
        </TouchableOpacity>

      </Container>
    </Background>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    padding: 10
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
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
    width: "95%",
    height: 50,
    backgroundColor: "#FFF",
    padding: 10,
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
