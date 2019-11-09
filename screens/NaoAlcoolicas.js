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
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Modal,
  Button,
  Image
} from 'react-native';
import ModalDetalhes from "../Components/ModalDetalhes";


function NaoAlcoolicas(props) {

  const [agua] = useState(3);
  const [refrigerante] = useState(2);
  const [beers, setBeers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemProduct, setItemProduct] = useState({});

  useEffect(() => {
    load();
  }, []);

  async function load() {
    await axios.get('https://api.cardapiodig.com.br/api/v1/produtos?filter[categoria_id]=' + agua + ',' + refrigerante)
      .then(function (response) {
        setBeers(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function closeModal(){
    setModalOpen(false)
  }

  return (
    <View>
      <Header style={styles.header} hasTabs>
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
              leftAvatar={{ source: { uri: `https://cardapio-digital.s3-sa-east-1.amazonaws.com/` + l.foto_produto } }}
              title={l.nome}
              subtitle={`R$` + l.valor}
              bottomDivider
              fontFamily
              onPress={() => {
                setItemProduct(l)
                setModalOpen(true)
              }}
            />
          ))
        }
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(!modalOpen)
        }}>
        <ModalDetalhes
          item={itemProduct}
          closeModal={() => {closeModal()}}
        />
      </Modal>

    </View>
  )
}
export default NaoAlcoolicas;

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
  header: { 
    backgroundColor: "gray",
  },
})

