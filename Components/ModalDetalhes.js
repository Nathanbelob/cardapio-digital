/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info'
import {
    numeroMesa
  } from "../utils/helper";
import {
    ScrollView,
    View,
    Text,
    Image,
    Modal,
    Button,
    TextInput,
    Alert
} from 'react-native';
import PropTypes from "prop-types";

function ModalDetalhes(props) {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [idPhone, setIdPhone] = useState(`2ad00fb5394036a6`);
    const [quantidade, setQuantidade] = useState(``);


    useEffect(() => {
        // DeviceInfo.getUniqueId().then(uniqueId => {
        //     setIdPhone(uniqueId)
        // });
        if (props.item.foto_produto != undefined) {
            Image.getSize(`https://cardapio-digital.s3-sa-east-1.amazonaws.com/` + props.item.foto_produto, (width, height) => {
                setWidth(width);
                setHeight(height);
            });
        }
    }, []);

    return (
        <ScrollView>
            <View style={{ marginTop: 22 }}>
                <View>
                    <Image
                        style={{ width: width, height: height }}
                        source={{ uri: `https://cardapio-digital.s3-sa-east-1.amazonaws.com/` + props.item.foto_produto }}
                    />
                </View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, marginBottom: 10 }}
                    onChangeText={text => setQuantidade(text)}
                    placeholder="Quantidade"
                    keyboardType={'numeric'}
                    value={quantidade}
                />
                <Button
                    style={{ marginBottom: 20 }}
                    title="Adicionar aos Pedidos!"
                ></Button>
                <Button
                    style={{ marginBottom: 20 }}
                    title="Pedido Rápido!"
                    onPress={() => {
                        axios.post('https://api.cardapiodig.com.br/api/v1/pedidos', {
                            id_produto: props.item.id,
                            numero_mesa: numeroMesa(idPhone),
                            quantidade: parseInt(quantidade),
                            status_pedido_id: 1
                        })
                        .then(function(response){
                            Alert.alert('Pedido realizado com sucesso!');
                            props.closeModal();
                        })
                        .catch(function (error) {
                            console.log(error);
                          });
                    }}
                ></Button>
            </View>
        </ScrollView>
    )
}
ModalDetalhes.propTypes = {
    item: PropTypes.object.isRequired,
    closeModal: PropTypes.func
};
export default ModalDetalhes;


