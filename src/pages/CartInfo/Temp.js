import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { cartContext } from '../../context/Cart';

import CardItem from '../../components/Cart';

export default function CartInfo({ props }) {
  const navigation = useNavigation();
  const { delivery, cart, subtotal, cleanCart } = cartContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(parseFloat(subtotal) + parseFloat(delivery.taxa_entrega));
  }, [subtotal, delivery]);

  async function enviarPedidoELimparCarrinho() {
    Alert.alert("Envia pedido para o Delivery, e limpa a Cesta de Compras...");
    await cleanCart();
    GoToLink("Pedidos");
  }

  async function cancelarPedidoELimparCarrinho() {
    Alert.alert("Cancela pedido e limpa a Cesta de Compras...");
    await cleanCart();
    navigation.goBack();
  }

  function GoToLink(link) {
    return navigation.navigate(link);
  }

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', width: '100%' }}>
          <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{delivery?.nome}</Text>
          <Text style={{ fontSize: 13 }}>{delivery?.horario}</Text>
          <Text style={{ fontSize: 13 }}><Fontisto color="#FF0000" name='map-marker-alt' size={18} /> {delivery?.endereco.endereco}, {delivery?.endereco.bairro}</Text>
          <Text style={{ fontSize: 13, marginBottom: 10 }}>Valor da Taxa de Entrega: R$ {delivery?.taxa_entrega.toFixed(2)}</Text>
        </View>
      </View>

      <FlatList
        data={cart}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={() => <Text style={styles.empty}>Cesta de Compras vazia!</Text>}
        renderItem={({ item }) => (
          <CardItem
            data={item}
            AddQtd={() => AddToCart(item, 1, item.vr_unitario)}
            RemoveQtd={() => RemoveFromCart(item)}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.subtotal}>Sub-Total: R$ {parseFloat(subtotal).toFixed(2)}</Text>
            <Text style={styles.taxa}>Taxa de Entrega: R$ {parseFloat(delivery.taxa_entrega).toFixed(2)}</Text>
            <Text style={styles.total}>Total: R$ {parseFloat(total).toFixed(2)}</Text>
          </View>
        )}
      />

      {
        (cart.length > 0) &&
        <TouchableOpacity style={styles.btnAdd} onPress={() => enviarPedidoELimparCarrinho()}>
          <Text style={{ color: '#FFF', fontSize: 18 }}>Enviar Pedido</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity style={styles.btnCancel} onPress={() => cancelarPedidoELimparCarrinho()}>
        <Text style={{ color: '#FFF', fontSize: 18 }}>Cancelar Pedido</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },
  subtotal:{
    fontSize: 18,
    marginTop: 20
  }, 
  taxa:{
    fontSize: 18,
  },
  total:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnAdd: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#145E7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnCancel: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  imagem:{
    width: 75, 
    height: 75,
  },
})

CartInfo.propTypes = {
  name: PropTypes.string.isRequired,
};

/** exemplo 1
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const Greeting = ({ name }) => {
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  );
};

Greeting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Greeting;
*/

/** exemplo 2
import PropTypes from 'prop-types';

function MyComponent(props) {
  return (
    <div>
      <h1>Hello, {props.name}!</h1>
    </div>
  );
}

MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
};
*/

/**
array: Para uma matriz de elementos de um tipo específico;
bool: Para um valor booleano;
func: Para uma função;
number: Para um número;
object: Para um objeto;
string: Para uma string;
symbol: Para um tipo de dado simbólico;
node: Para um nó React (ou seja, um objeto React);
element: Para um elemento React (ou seja, um componente);
instanceOf: Para uma instância de uma classe específica;
oneOf: Para um valor em uma lista específica de valores;
oneOfType: Para um tipo específico entre um conjunto de tipos;
arrayOf: Para uma matriz de um determinado tipo;
objectOf: Para um objeto com propriedades de um determinado tipo;
shape: Para um objeto com propriedades específicas e tipos de dados;
exact: Para um objeto com propriedades exatas.
*/
