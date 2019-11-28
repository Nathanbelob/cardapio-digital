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
import Modal from "react-native-modal";
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native';
import ModalDetalhes from "../Components/ModalDetalhes";


function Drinks(props) {

  const [drink] = useState(4);
  const [beers, setBeers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemProduct, setItemProduct] = useState({});

  useEffect(() => {
    loadBeers();
  }, [drink]);

  async function loadBeers() {
    await axios.get('https://api.cardapiodig.com.br/api/v1/produtos?filter[categoria_id]=' + drink)
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
export default Drinks;

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

