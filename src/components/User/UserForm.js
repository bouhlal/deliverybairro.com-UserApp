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
  const [marcador, setMarcador] = useState(data.marcador);

  return (
    <ScrollView style={styles.container}>
      <TextInput 
        value={nome} 
        placeholder="Nome" 
        onChangeText={(input) => setNome(input)} 
      />
      <TextInput
        value={sobrenome}
        placeholder="Sobrenome"
        onChangeText={(input) => setSobrenome(input)}
      />
      <TextInput 
        value={email} 
        placeholder="Email" 
        onChangeText={(input) => setEmail(input)} 
      />
      <TextInput
        value={telefone}
        onChangeText={(input) => setTelefone(input)}
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
        style={styles.input}
        placeholder="Endereco"
        onChangeText={(input) => setEndereco(input)}
        autoCapitalize='true'
        keyboardType='numeric'
      />
      <TextInput
        value={complemento}
        style={styles.input}
        placeholder="Complemento"
        onChangeText={(input) => setComplemento(input)}
        autoCapitalize='true'
      />
      <TextInput
        value={bairro}
        style={styles.input}
        placeholder="Bairro"
        onChangeText={(input) => setBairro(input)}
        autoCapitalize='true'
      />
      <TextInput
        value={cidade}
        style={styles.input}
        placeholder="cidade"
        onChangeText={(input) => setCidade(input)}
        autoCapitalize='true'
      />
      <TextInput
        value={uf}
        style={styles.input}
        placeholder="UF"
        onChangeText={(input) => setUf(input)}
      />
      <TextInput
        value={cep}
        style={styles.input}
        placeholder="CEP"
        onChangeText={(input) => setCep(input)}
        keyboardType='numeric'
      />
      <TextInput
        value={marcador}
        style={styles.input}
        placeholder="Marcador (JSON)"
        onChangeText={(input) => setMarcador(input)}
        keyboardType='numeric'
      />
      
      <TextInput
        value={urlFoto}
        style={styles.input}
        placeholder="URL da foto"
        onChangeText={(input) => setUrlFoto(input)}
        autoCapitalize='none'
        autoCorrect={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
