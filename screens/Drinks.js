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

function Drinks(props) {

  const [drink] = useState(4);
  const [beers, setBeers] = useState([]);
  

  useEffect(() => {
    loadBeers();
  }, []);

   async function loadBeers(){
    await axios.get('https://api.cardapiodig.com.br/api/v1/produtos?filter[categoria_id]='+drink)
    .then(function (response) {
      setBeers(response.data)
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
          beers.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: `https://cardapio-digital.s3-sa-east-1.amazonaws.com/`+ l.foto_produto } }}
              title={l.nome}
              subtitle={`R$` + l.valor}
              bottomDivider
              fontFamily
              onPress={() => {
                Alert.alert(
                  'Adicionar aos pedidos?',
                  'Esse item será adicionado a sua lista de pedidos',
                  [
                    {
                      text: 'Já efetuar o pedido!', onPress: () => {
                        axios.post('https://api.cardapiodig.com.br/api/v1/pedidos', { id_produto: l.id, numero_mesa: 24 })
                          .then(function (response) {
                            Alert.alert('Pedido de ' + l.name + ' realizado com sucesso!')
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
      </ScrollView>
    </View>
  )
}
export default Drinks;

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

