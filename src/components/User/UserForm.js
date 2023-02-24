import React, { useState } from 'react';
import { ScrollView, TextInput, StyleSheet } from 'react-native';
import { TextMask } from 'react-native-masked-text';

export default function UserForm({ data }) {

  const [nome, setNome] = useState(data.nome);
  const [sobrenome, setSobrenome] = useState(data.sobrenome);
  const [telefone, setTelefone] = useState(data.telefone);
  const [email, setEmail] = useState(data.email);
  const [endereco, setEndereco] = useState(data.endereco);
  const [complemento, setComplemento] = useState(data.complemento);
  const [bairro, setBairro] = useState(data.bairro);
  const [cidade, setCidade] = useState(data.cidade);
  const [cep, setCep] = useState(data.cep);
  const [uf, setUf] = useState(data.uf);
  const [url_foto, setUrlFoto] = useState(data.urlFoto);
  const [latitude, setLatitude] = useState(data.latitude);
  const [longitude, setLongitude] = useState(data.longitude);

  function maskEditPhone(formatted, extracted) {
    setTelefone(extracted);
  }

  function maskEditCep(formatted, extracted) {
    setCep(extracted);
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  scrollview: {
    flex: 5, // 5:6
    backgroundColor: 'white',
    padding: 20
  },
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontSize: 21, 
    fontWeight: 'bold',
  },
  subtitle:{
    fontSize: 18,
  },
  input:{
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    fontSize: 17,
    color: "#000",
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 7,
  },
  btnSubmit:{
    width: "100%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 7,
  },
  btnText:{
    fontSize: 20,
    color: "#FFF"
  },
})
