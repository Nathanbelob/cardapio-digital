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
  Button,
  ImageBackground,
  Alert
} from 'react-native';

import {
  numeroMesa
} from "../utils/helper";

import Cronometro from "../Components/Cronometro";

function App(props) {

  const [showMenu, setShowMenu] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [shwowButtonStart, setShowButtonStart] = useState(true);
  const [idPhone, setIdPhone] = useState(`2ad00fb5394036a6`);

  return (
    <>
      <Header style={styles.header} hasTabs>
        {
          showMenu &&
          <Left>
            <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
          </Left>
        }
        <Body />
        <Right />
      </Header>


      <ImageBackground source={require('../assets/fundo.jpeg')}
        style={styles.backgroundImage}>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <View>
            <Image source={require('../assets/logo-sem-fundo.png')} style={{ height: 300, width: 300 }} />
          </View>
          {
            shwowButtonStart &&
            <>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, fontFamily: 'cinzel', marginBottom: 15 }}> Seja Bem Vindo!</Text>
            <Button
              color='#f2a951'
              title="Iniciar atendimento!"
              onPress={() => {
                axios.put(`https://api.cardapiodig.com.br/api/v1/mesas/${numeroMesa(idPhone)}`, {
                  status_id : 2
                })
                  .then(function (response) {
                    Alert.alert(
                      'Atendimento iniciado',
                      'Seu atendimento foi iniciado. Qualquer dúvida, favor chamar o garçom. Obrigado pela preferencia',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => {
                          props.navigation.openDrawer()
                          setShowMenu(true)
                          setShowButtonStart(false)
                          setShowTimer(true)
                        }},
                      ],
                      {cancelable: false},
                    );
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }}
              style={{ marginTop: 10, borderRadius: 10 }}
            />
            </>
          }
          {
            showTimer &&
            <Cronometro/>
          }
        </View>


      </ImageBackground>


    </>

  )
}

export default App;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  header: {
    backgroundColor: "gray",
  },
});

const styles2 = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 32
  }
});

