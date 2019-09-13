/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, fetchAll } from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements'

function App() {

  fetchAll(
    axios.get('https://api.cardapiodig.com.br/api/v1/produtos')
    .then(function (response) {
      response.data.forEach(function (value) {
        console.log(value)
        list.push(value);
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    ,[]);
  const [value, setValue] = useState();
  const [list] = useState([])
  const list2 = [
    {
      name: 'Amy Farha',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: 'Vice President'
    },
  ]

  
    axios.get('https://api.cardapiodig.com.br/api/v1/produtos')
      .then(function (response) {
        response.data.forEach(function (value) {
          console.log(value)
          list.push(value);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    
    console.log(list)
    console.log(list2)
  return (
    <View>
      {
        list.map((l) => (
          <ListItem
            key={l.id}
            title={l.nome}
          />
        ))
      }
    </View>
  );
};
export default App;

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

