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
  TouchableOpacity
} from 'react-native';

function App(props) {
  return (
    <>
      <Header style={styles.header} hasTabs>
        <Left>
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body />
        <Right />
      </Header>


      <ImageBackground source={require('../assets/fundo.jpeg')}
        style={styles.backgroundImage}>

        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <View>
            <Image source={require('../assets/logo-sem-fundo.png')} style={{ height: 300, width: 300 }} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, fontFamily:'cinzel', marginBottom: 15 }}> Seja Bem Vindo!</Text>
          <Button
          color='#f2a951'
          title="Iniciar atendimento!"
          onPress={() => props.navigation.openDrawer()}
          style={{ marginTop: 10, borderRadius: 10 }}
          />
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

