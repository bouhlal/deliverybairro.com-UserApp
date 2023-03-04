/**
 * index.js (src/pages/User/index.js)
 */

import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Keyboard, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../../models';
import { useAuthContext } from '../../contexts/AuthContext';

import Header from '../../components/Header';

export default function Perfil() {
  const { usr_token, dbUser } = useAuthContext();

  const [nome, setNome] = useState(dbUser?.nome || '');
  const [sobrenome, setSobrenome] = useState(dbUser?.sobrenome || "");
  const [url_foto, setUrlFoto] = useState(dbUser?.url_foto || "");
  const [latitude, setLatitude] = useState(dbUser?.latitude || "0");
  const [longitude, setLongitude] = useState(dbUser?.longitude || "0");
  const [info, setInfo] = useState("");

  const navigation = useNavigation();

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  async function onSave() {
    try {
      if (!!dbUser) {
        await updateUser();
      } else {
        await createUser();
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  async function updateUser() {
    try {
      await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.nome = nome;
          updated.sobrenome = sobrenome;
          updated.url_foto = url_foto;
          updated.token = usr_token;
          updated.latitude = parseFloat(latitude);
          updated.longitude = parseFloat(longitude);
        })
      );
      Alert.alert("Sucesso", "Dados do Usuário atualizados com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os dados do Usuário.");
      console.log(error.message);
    }
  };

  async function createUser() {
    try {
      await DataStore.save(
        new User({
          nome,
          sobrenome,
          url_foto: null,
          token: usr_token,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        })
      );
      Alert.alert("Sucesso", "Dados do Usuário cadastrados com sucesso!"
      );
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar os dados do Usuário. Tente novamente");
      console.log(error.message);
    }
  };

  async function getPositionByGps() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      const info = `(latitude: ${latitude}, longitude: ${longitude})`;
      setInfo(info);
    } catch (error) {
      console.error(`Não foi possível obter a localização. ${error.message}`);
      setInfo("Não foi possível obter a localização atual do Usuário.");
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
            // placeholder="-19.82711"
            onChangeText={(input) => setLatitude(input)}
            keyboardType='numeric'
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Longitude:</Text>
          <TextInput
            value={longitude}
            // placeholder="-43.98319"
            onChangeText={(input) => setLongitude(input)}
            keyboardType='numeric'
            style={styles.input}
          />
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.btnSubmit, {marginTop: 15}]} onPress={onSave}>
        <Text style={styles.btnTxt}>{ (!!dbUser) ? "ATUALIZAR" : "SALVAR" } DADOS</Text>
      </TouchableOpacity>

      <Text style={{fontSize: 13, textAlign: "center"}}>{info}</Text>

      <TouchableOpacity style={styles.btnSubmit} onPress={() => getPositionByGps()} >
        <Text style={styles.btnTxt}>OBTER COORDENADAS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogout} onPress={signOut} >
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

/**
 * blocos removidos do código acima
 * 
  import { GOOGLE_APIKEY } from '@env';
  import { TextInputMask } from 'react-native-masked-text';

  const [telefone, setTelefone] = useState(dbUser?.telefone || "");
  const [email, setEmail] = useState(dbUser?.email || "");
  const [endereco, setEndereco] = useState(dbUser?.endereco || null);
  const [complemento, setComplemento] = useState(dbUser?.complemento || "");
  const [bairro, setBairro] = useState(dbUser?.bairro || "");
  const [cidade, setCidade] = useState(dbUser?.cidade || "");
  const [uf, setUf] = useState(dbUser?.uf || "");
  const [cep, setCep] = useState(dbUser?.cep || "");

  const [errorMsg, setErrorMsg] = useState(null);
  const [info, setInfo] = useState("Toque no botão para obter as coordenadas");

  useEffect(() => {
    if (errorMsg) {
      setInfo(errorMsg);
    } else {
      setInfo(`Localização Atual (${latitude}, ${longitude})`);
    }
  }, [errorMsg, latitude, longitude])

  async function getCoordinates() {
    const apiKey = GOOGLE_APIKEY; 
    const formattedAddress = `${endereco}${complemento ? `, ${complemento}` : ''}, ${bairro}, ${cidade} - ${uf}, ${cep}`.replace(/ /g, '+');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      console.log(data.results[0].geometry.location);
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
    if (!dbUser) {
      await getCoordinates();
      getLocation();
    } else {
      setLatitude(0);
      setLongitude(0);
    }
  };

  function maskEditPhone(formatted, extracted) {
    setTelefone(extracted);
  }

  function maskEditCep(formatted, extracted) {
    setCep(extracted);
  }

  // outros componentes utilizados anteriormente neste formulário:

  <View style={styles.areaInput}>
    <Text style={{marginBottom: 5}}>Email:</Text>
    <TextInput 
      value={email} 
      placeholder="Email" 
      autoCapitalize="none"
      onChangeText={(input) => setEmail(input.toLowerCase())} 
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

 */