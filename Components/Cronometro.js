import React, { Component, Fragment, useState, useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { Timer, FlipNumber } from 'react-native-flip-timer';

function Cronometro(props) {
    const [play] = useState(true);

    return (
        <View style={styles.container}>
          <Timer time={0} play={play} />
        </View>
      );
}
export default Cronometro;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#272c32',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      height: 40,
      backgroundColor: '#333333',
      width: 120,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#cccccc',
    },
  });
