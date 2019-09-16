/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import { List, ListItem } from 'react-native-elements';
import { Header, Left, Right, Icon, Body  } from 'native-base';

// import axios from 'axios';
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

function Bebidas(props) {

  // axios.get('https://api.cardapiodig.com.br/api/v1/produtos')
  //   .then(function (response) {
  //     response.data.forEach(function (value) {
  //       console.log(value);
  //       list.push(value);
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  const [list] = useState([
    {
      name: 'Skol',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/N7-KNcN6.png',
      subtitle: 'R$ 9,00'
    },
    {
      name: 'Brahma',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/57868492fdee035a04d48dc372e6e7fb.jpg',
      subtitle: 'R$ 9,00'
    },
    {
      name: 'Antartica Original',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/original_Easy-Resize.com_-840x630.jpg',
      subtitle: 'R$ 11,00'
    },
    {
      name: 'Bohemia',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/luminoso-bohemia-branco-redondo-bivolt-aluminio-led-30x4-cm-Carro-de-Mola-Z-1SITb.jpg',
      subtitle: 'R$ 11,00'
    },
    {
      name: 'Heinekein',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/9C_w5ogD_400x400.jpg',
      subtitle: 'R$ 11,00'
    },
    {
      name: 'Kaiser',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/download.jpeg',
      subtitle: 'R$ 8,00'
    },
    {
      name: 'Eisenbahn',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/fa0ad91604.jpg',
      subtitle: 'R$ 11,00'
    },
    {
      name: 'Colorado',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/placa-decorativas-mdf-tampa-cerveja-colorado-D_NQ_NP_633898-MLB29311600711_022019-F.jpg',
      subtitle: 'R$ 19,00'
    },
  ])

  return (
    <View>
      <Header>
        <Left>
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body/>
        <Right/>
      </Header>
      <ScrollView>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
              fontFamily
              onPress={() => { 
                Alert.alert(
                  'Adicionar aos pedidos?',
                  'Esse item será adicionado a sua lista de pedidos',
                  [
                    {text: 'Já efetuar o pedido!', onPress: () => console.log('Ask me later pressed')},
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
  )
}
export default Bebidas;

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

