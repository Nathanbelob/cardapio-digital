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
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    numeroMesa
} from "../utils/helper";
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    Button,
    TextInput,
    Alert
} from 'react-native';

import PropTypes from "prop-types";

function ModalDetalhes(props) {
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [idPhone, setIdPhone] = useState(`2ad00fb5394036a6`);
    const [quantidade, setQuantidade] = useState(1);
    const [adicionais, setAdicionais] = useState([]);
    const [adicionaisChecked] = useState([]);
    const [observacao, setObservacao] = useState(``);
    const [corCheck, setCorCheck] = useState(`#000`)
    useEffect(() => {
        // DeviceInfo.getUniqueId().then(uniqueId => {
        //     setIdPhone(uniqueId)
        // });
        loadAdicionais();
        if (props.item.foto_produto != undefined) {
            Image.getSize(`https://cardapio-digital.s3-sa-east-1.amazonaws.com/` + props.item.foto_produto, (width, height) => {
                setWidth(width);
                setHeight(height);
            });
        }
        adicionais.map(a => 
            (
                a.checked = false
            ))
    }, []);

    async function loadAdicionais() {
        await axios.get('https://api.cardapiodig.com.br/api/v1/adicionais')
          .then(function (response) {
            setAdicionais(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    function getCheckedAdicionais(){
        adicionaisPedidos = adicionais.map(function(adicional, ) {

            if(adicional.checked){
                adicionaisChecked.push(adicional.id)       
            }
        }.bind(this));

        return adicionaisChecked;
    }

    function Separator() {
        return <View style={styles.separator} />;
    }

    return (
        <ScrollView>
            <View style={styles.content}>
                {props.comida &&
                <>
                <Text style={{ fontSize: 30 }} > Adicionais</Text>
                {
                    adicionais.map((a, i) => (
                        <CheckBox
                            center
                            title={
                                <Text style={{ fontSize: 20, color:a.checked ? '#008000' : '#000' }}> {a.nome} - R${a.valor}</Text>
                            }
                            iconRight
                            iconType='material'
                            checkedIcon='clear'
                            uncheckedIcon='add'
                            checkedColor='red'
                            checked={a.checked}
                            onPress={() => {
                                a.checked = !a.checked                                
                            }}
                        />
                    ))
                }
                <View
                    style={{
                        borderBottomColor: '#000000',
                        borderBottomWidth: 1,
                        marginBottom: 20
                    }}>
                    <Text style={{ fontSize: 30 }} > Observações</Text>
                    <TextInput
                        placeholder="   Exemplo: tirar a cebola!"
                        editable
                        maxLength={40}
                        value={observacao}
                        onChangeText={text => setObservacao(text)}
                    />
                </View>
                </>
                }
                <View style={{
                    flexDirection: "row"
                }}>
                    <View style={{
                        flex: 1,
                        marginLeft: 150,
                        marginRight: 12,
                        marginTop: 8
                    }}>
                        <Icon style={{ marginRight: 10 }}
                            name={'remove-circle-outline'}
                            onPress={() => quantidade == 0 ? setQuantidade(0) : setQuantidade(parseInt(quantidade - 1))}
                            size={40} />
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{ fontSize: 40, marginBottom: 30 }}> {quantidade}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        marginRight: 150,
                        marginLeft: 7,
                        marginTop: 8

                    }}>
                        <Icon style={{ marginLeft: 10 }}
                            name={'add-circle-outline'}
                            onPress={() => setQuantidade(parseInt(quantidade + 1))}
                            size={40}
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row"
                    }}
                >
                    <View
                        style={{
                            flex: 2,
                            marginRight: 20
                        }}
                    >
                        <Button
                            title="Realizar Pedido!"
                            color="darkgreen"
                            onPress={() => {
                                axios.post('https://api.cardapiodig.com.br/api/v1/pedidos', {
                                    id_produto: props.item.id,
                                    numero_mesa: numeroMesa(idPhone),
                                    quantidade: parseInt(quantidade),
                                    status_pedido_id: 1,
                                    adicionais: getCheckedAdicionais(),
                                    observacao: observacao
                                })
                                    .then(function (response) {
                                        console.log(props)
                                        console.log(response)
                                        Alert.alert('Pedido realizado com sucesso!');
                                        props.closeModal()
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 2,
                            marginLeft: 20
                        }}>
                        <Button
                            title="Cancelar!"
                            onPress={() => props.closeModal()}
                            color="darkred"
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
ModalDetalhes.propTypes = {
    item: PropTypes.object.isRequired,
    closeModal: PropTypes.func,
    comida: PropTypes.bool
};
export default ModalDetalhes;

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    content: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
});


