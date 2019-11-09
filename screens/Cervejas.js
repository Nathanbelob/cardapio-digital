/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import { List, ListItem } from 'react-native-elements';
import { Header, Left, Right, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableHighlight,
  Alert,
  Button
} from 'react-native';

import {
  numeroMesa
} from "../utils/helper";

import ModalDetalhes from "../Components/ModalDetalhes";

function Cervejas(props) {

  const [cerveja] = useState(1);
  const [beers, setBeers] = useState([]);
  const [idPhone, setIdPhone] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [itemProduct, setItemProduct] = useState({});

  useEffect(() => {
    loadBeers();
  }, [beers]);

  async function loadBeers() {
    await axios.get('https://api.cardapiodig.com.br/api/v1/produtos?filter[categoria_id]=' + cerveja)
      .then(function (response) {
        setBeers(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View>
        <Header style={styles.header} hasTabs>
          <Left>
            <Icon name="menu" size={26} onPress={() => props.navigation.openDrawer()} />
          </Left>
          <Body />
          <Right />
        </Header>
        {
          beers.map((l, i) => (
            <>
              <ListItem
                leftAvatar={{
                  source: { uri: `https://cardapio-digital.s3-sa-east-1.amazonaws.com/` + l.foto_produto },
                  size: "xlarge",
                  rounded: false
                }}
                title={
                  <Text style={{ fontWeight: 'bold', fontSize: 30 }}> {l.nome}</Text>
                }
                subtitle={
                  <>
                    <Text style={{ fontSize: 20 }}> {'R$' + l.valor}</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}> {l.descricao}</Text>
                  </>
                }
                onPress={() => {
                  setItemProduct(l)
                  setModalOpen(true)
                }}
                bottomDivider
                fontFamily
              />
              <Modal isVisible={modalOpen}
                onBackdropPress={() => setModalOpen(false)}
                onBackButtonPress={() => setModalOpen(false)}
                backdropOpacity={0.8}>
                {
                  <ModalDetalhes
                    item={itemProduct}
                    closeModal={() => { closeModal() }}
                    comida={false}
                  />
                }
              </Modal>
            </>
          ))
        }
      </View>
    </ScrollView>
  )
}
export default Cervejas;

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

