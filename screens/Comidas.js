/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import { List, ListItem } from 'react-native-elements';
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
  Modal,
  TouchableHighlight,
  Alert
} from 'react-native';
import { Header, Left, Right, Icon, Body } from 'native-base';

function Comidas(props) {

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

  const [openModal, setOpenModal] = useState(false);
  const [list] = useState([
    {
      name: 'Fritas',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/batata.jpg',
      subtitle: 'R$ 15,00',
      description: 'Batata frita tradiconal! Acompanha molho da casa'
    },
    {
      name: 'Fritas com Cheedar e Bacon',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/usuario-2149-3e1951db57a165aec9e3ec025faa2283.jpg',
      subtitle: 'R$ 19,00',
      description: 'Batata frita tradiconal acompanhada com um delicioso queijo \ncheedar cremoso e um bacon super crocante! Acompanha molho da casa'

    },
    {
      name: 'Iscas de Tilápia',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/estancia-do-cupim.jpg',
      subtitle: 'R$ 22,00',
      description: 'Iscas de tilápia super crocantes e com um tempero escpecial da casa! Acompanha molho da casa'

    },
    {
      name: 'Contra Filé Acebolado',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/bife-em-tiras-na-manteiga.jpg',
      subtitle: 'R$ 30,00',
      description: 'Tiras de contra filé super bem temperados acompanhados de cebola! Acompanha molho da casa e farofa'

    },
    {
      name: 'Picanha na chapa',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/download.png',
      subtitle: 'R$ 40,00',
      description: 'Picanha super macia, ao ponto que você desejar! Acompanha molho da casa, farofa e vinagrete'

    },
    {
      name: 'Frango a Passarinho',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/frango-a-passarinho-curry.jpg',
      subtitle: 'R$ 17,00',
      description: 'Frango a passarinho super crocante! Acompanha molho da casa'

    },
    {
      name: 'Costela',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/costela.jpeg',
      subtitle: 'R$ 35,00',
      description: 'Costala inteira, super macia e com um tempero da casa irresistivel! Acompanha molho da casa, batatas, farofa, vinagrete e pães'

    },
    {
      name: 'Porção de frios',
      avatar_url: 'https://cardapio-digital.s3-sa-east-1.amazonaws.com/40e187639b874176e80c88ba99f96620.jpg',
      subtitle: 'R$ 19,00',
      description: 'Uma mega porção que vem mussarela, presunto, salame e azeitonas'

    },
    
  ])

  function funcaoTeste(nome){
    Alert.alert(nome);
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
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              bottomDivider
              fontFamily
              rightIcon={() => {
                return(
                  <>
                  <Text>Detalhes </Text>
                  <Icon name="ios-arrow-dropright" onPress={() => Alert.alert(l.description)}/>
                  </>
                )
              }}
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
    </>
  )
}
export default Comidas;

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

