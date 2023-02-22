import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { TextMask } from 'react-native-masked-text';
import { authContext } from '../../context/Auth';
import { DataStore } from 'aws-amplify';
import { User } from '../../models';

import { GOOGLE_APIKEY } from '@env';
import * as Location from 'expo-location';

import Header from '../../components/Header';

export default function Perfil() {
  const { sub, dbUser, setDbUser, signOut } = authContext();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cep, setCep] = useState('');
  const [uf, setUf] = useState('');
  const [marcador, setMarcador] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);
  const [info, setInfo] = useState("Toque no botão para obter as coordenadas");

  async function getCoordinates() {
    const { endereco, complemento, bairro, cidade, cep, uf } = {
      "endereco": endereco, "complemento": complemento, "bairro": bairro, "cidade": cidade, "uf": uf, "cep": cep
    };

    const apiKey = GOOGLE_APIKEY; 
    const formattedAddress = `${endereco}${complemento ? `, ${complemento}` : ''}, ${bairro}, ${cidade} - ${uf}, ${cep}`.replace(/ /g, '+');
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setMarcador({ latitude: lat, longitude: lng });
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
      setMarcador(coords);
    } catch (error) {
      setErrorMsg('Erro ao obter a localização');
    }
  }

  async function loadGpsByAddress() {
    if (!marcador) {
      await getCoordinates();
      getLocation();
    } else {
      setMarcador(null);
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
          "marcador": marcador,
          "url_foto": null,
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
          item.nome = nome, item.sobrenome = sobrenome, item.telefone = telefone, item.email = email, item.endereco = enderecoObj, 
          item.uf = uf, item.marcador = marcador 
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
    } else if (marcador) {
      setInfo(`Localização Atual (Latitude: ${marcador.latitude}, Longitude: ${marcador.longitude})`);
    }
  }, [errorMsg, marcador])


  function UserForm() {
    return (
      <ScrollView style={styles.container}>
        <TextInput 
          value={nome} 
          placeholder="Nome" 
          onChangeText={(input) => setNome(input)} 
          style={styles.input}
        />
        <TextInput
          value={sobrenome}
          placeholder="Sobrenome"
          onChangeText={(input) => setSobrenome(input)}
          style={styles.input}
        />
        <TextInput 
          value={email} 
          placeholder="Email" 
          onChangeText={(input) => setEmail(input)} 
          style={styles.input}
        />
        <TextInput
          value={telefone}
          placeholder="Telefone" 
          onChangeText={(input) => setTelefone(input)}
          style={styles.input}
          render={(props) => (
            <TextMask
              {...props}
              type={'cel-phone'} 
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '+99 (99) ',
              }}
            />
          )}
        />
        <TextInput
          value={endereco}
          placeholder="Endereco"
          onChangeText={(input) => setEndereco(input)}
          autoCapitalize='true'
          keyboardType='numeric'
          style={styles.input}
        />
        <TextInput
          value={complemento}
          placeholder="Complemento"
          onChangeText={(input) => setComplemento(input)}
          autoCapitalize='true'
          style={styles.input}
        />
        <TextInput
          value={bairro}
          placeholder="Bairro"
          onChangeText={(input) => setBairro(input)}
          autoCapitalize='true'
          style={styles.input}
        />
        <TextInput
          value={cidade}
          placeholder="cidade"
          onChangeText={(input) => setCidade(input)}
          autoCapitalize='true'
          style={styles.input}
        />
        <TextInput
          value={uf}
          placeholder="UF"
          onChangeText={(input) => setUf(input)}
          style={styles.input}
        />
        <TextInput
          value={cep}
          placeholder="CEP"
          onChangeText={(input) => setCep(input)}
          keyboardType='numeric'
          style={styles.input}
        />
        <TextInput
          value={marcador}
          placeholder="Marcador (JSON)"
          onChangeText={(input) => setMarcador(input)}
          keyboardType='numeric'
          style={styles.input}
        />
        <TextInput
          value={urlFoto}
          placeholder="URL da foto"
          onChangeText={(input) => setUrlFoto(input)}
          autoCapitalize='none'
          autoCorrect={false}
          style={styles.input}
        />
      </ScrollView>
    );
  }
  
  return (
    <View style={styles.background}>
      <Header/>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Dados do Usuário (Perfil)</Text>

        <UserForm/>

        { !dbUser ? (
          <TouchableOpacity style={styles.btnSubmit} onPress={() => createUser()}>
            <Text style={styles.btnTxt}>SALVAR DADOS</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnSubmit} onPress={() => updateUser()}>
            <Text style={styles.btnTxt}>ATUALIZAR DADOS</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.line13}>{info}</Text>
        <TouchableOpacity style={styles.btnSubmit} onPress={loadGpsByAddress} >
          <Text style={styles.btnTxt}>OBTER COORDENADAS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnLogout} onPress={() => signOut()} >
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
  btnSubmit:{
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 7,
    marginBottom: 10,
  },
  btnLogout: {
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 7,
    marginBottom: 10
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
