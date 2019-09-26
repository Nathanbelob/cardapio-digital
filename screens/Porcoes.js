/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import { List, ListItem } from 'react-native-elements';
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
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Header, Left, Right, Icon, Body } from 'native-base';

function Porcoes(props) {


  const [porcao] = useState(2)
  const [porcoes, setPorcoes] = useState([]);

  useEffect(() => {
    loadPorcoes();
  }, []);

  function loadPorcoes(){
    axios.get('https://api.cardapiodig.com.br/api/v1/produtos?filter[categoria_id]='+porcao)
    .then(function (response) {
      setPorcoes(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <>
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
          porcoes.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.foto_produto } }}
              title={l.nome}
              subtitle={`R$`+l.valor+`,00`}
              bottomDivider
              fontFamily
              rightIcon={() => {
                return(
                  <>
                  <Text>Detalhes </Text>
                  <Icon name="ios-arrow-dropright" onPress={() => Alert.alert(l.descricao)}/>
                  </>
                )
              }}
              onPress={() => { 
                Alert.alert(
                  'Adicionar aos pedidos?',
                  'Esse item será adicionado a sua lista de pedidos',
                  [
                    {text: 'Já efetuar o pedido!', onPress: () => Alert.alert('Pedido realizado com sucesso!')},
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
               }}
            />
          ))
        }
      </ScrollView>
    </View>
    </>
  )
}
export default Porcoes;

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

