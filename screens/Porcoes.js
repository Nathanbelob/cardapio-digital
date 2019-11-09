/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import { List, ListItem, CheckBox } from 'react-native-elements';
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
import { Header, Left, Right, Body } from 'native-base';
import {
  numeroMesa
} from "../utils/helper";
import ModalDetalhes from "../Components/ModalDetalhes";


function Porcoes(props) {


  const [porcao] = useState(6)
  const [porcoes, setPorcoes] = useState([]);
  const [quantidade, setQuantidade] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [idPhone, setIdPhone] = useState(`2ad00fb5394036a6`);

  const [itemProduct, setItemProduct] = useState({});

  useEffect(() => {
    loadPorcoes();
  }, [porcoes]);

  function loadPorcoes() {
    axios.get('https://api.cardapiodig.com.br/api/v1/produtos?filter[categoria_id]=' + porcao)
      .then(function (response) {
        setPorcoes(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function closeModal() {
    setModalOpen(false);
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
          porcoes.map((l, i) => (
            <>
              <ListItem
                key={i}
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
                    comida={true}
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
export default Porcoes;

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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
  header: {
    backgroundColor: "gray",
  },
})
