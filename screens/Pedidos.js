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

function Pedidos(props) {

  const [idPhone, setIdPhone] = useState();
  setIdPhone(DeviceInfo.getUniqueID());
  return (
    <View>
      <Text>{idPhone}</Text>
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

