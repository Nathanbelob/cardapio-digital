/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import { List, ListItem } from 'react-native-elements';
import { Header, Left, Right, Icon, Body } from 'native-base';
import DeviceInfo from 'react-native-device-info';

import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  Alert
} from 'react-native';

import {
  numeroMesa
} from "../utils/helper";

function Pedidos(props) {

  const [pedidos, setPedidos] = useState([]);
  const [idPhone, setIdPhone] = useState(`2ad00fb5394036a6`);
  const [numero_mesa, setNumeroMesa] = useState(numeroMesa(idPhone));
  const [valor_total, setValorTotal] = useState(0);


  useEffect(() => {
    loadPedidos();
  }, [pedidos]);

   async function loadPedidos(){
    DeviceInfo.getUniqueId().then(uniqueId => {
      setIdPhone(uniqueId)
    });
    setNumeroMesa(numeroMesa(idPhone));
    await axios.get('https://api.cardapiodig.com.br/api/v1/pedidos?filter[numero_mesa]='+numero_mesa)
    .then(function (response) {
      setPedidos(response.data.pedidos)
      setValorTotal(response.data.valor_total)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <View>
      <Header>
        <Left>
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body />
        <Right />
      </Header>
      <ScrollView>
        {
          pedidos.map((l, i) => (
            <ListItem 
              key={i}
              leftAvatar={{ source: { uri: `https://cardapio-digital.s3-sa-east-1.amazonaws.com/`+ l.cad_produto.foto_produto } }}
              title={l.cad_produto.nome}
              subtitle={l.cfg_status_pedido.descricao}
              bottomDivider
              fontFamily
              onPress={() => {
                Alert.alert(
                  'Adicionar aos pedidos?',
                  'Esse item será adicionado a sua lista de pedidos',
                  [
                    {
                      text: 'Já efetuar o pedido!', onPress: () => {
                        axios.post('https://api.cardapiodig.com.br/api/v1/pedidos', { 
                          id_produto: l.id, 
                          numero_mesa: numeroMesa(idPhone), 
                          quantidade: 1,
                          status_pedido_id: 1
                        })
                          .then(function (response) {
                            Alert.alert('Pedido de ' + l.nome + ' realizado com sucesso!')
                          });
                      }
                    },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                  ],
                  { cancelable: false },
                );
              }}
            />
          ))
        }
        <Text>Total Parcial da conta: R${valor_total}</Text>
      </ScrollView>
    </View>
  )
}
export default Pedidos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: '#FFFFFF'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

