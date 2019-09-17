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
  Image
} from 'react-native';

function App(props) {
    return (
      <View styles={styles.container}>
        <Header>
          <Left>
            <Icon name="menu" onPress={() => props.navigation.openDrawer()} />
          </Left>
          <Body />
          <Right />
        </Header>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../assets/logo-bar.jpeg')} style={{ height: 120, width: 120 }} />
        </View>
      </View>
    )
  }

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

