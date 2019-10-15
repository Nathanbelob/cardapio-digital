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
  Button
} from 'react-native';

function App(props) {
  return (
    <>
      <Header>
        <Left>
          <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
        </Left>
        <Body />
        <Right />
      </Header>
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'column' }}>
        <View>
          <Image source={require('../assets/logo-bar.jpeg')} style={{ height: 120, width: 120 }} />
        </View>
        <Button
          title="Iniciar Atendimento!"
          onPress={() => Alert.alert('Simple Button pressed')}
        />
      </View>

    </>

  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

