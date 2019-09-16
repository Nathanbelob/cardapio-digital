import React, { Component } from 'react';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
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
import Bebidas from "./screens/Bebidas";
import Home from "./screens/Home";
import Comidas from "./screens/Comidas";

const CustomDrawerComponent = (props) => (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height:150, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
        <Image source={require('./assets/logobar.jpg')} style={{height: 120, width:120, borderRadius:60}}/>
      </View>
      <ScrollView>
        <DrawerNavigatorItems {...props}/>
      </ScrollView>
    </SafeAreaView>
)

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen:Home,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home',
      drawerIcon: () => (
        <Icon name={'home'} size={25} />
        )
    },
  },
  Bebidas: {
    screen:Bebidas,
    navigationOptions: {
      title: 'Bebidas',
      drawerLabel: 'Bebidas',
      drawerIcon: () => (
        <Icon name={'ios-beer'} size={25} />
        )
    },
  },
  Comidas: {
    screen:Comidas,
    navigationOptions: {
      title: 'Comidas',
      drawerLabel: 'Comidas',
      drawerIcon: () => (
        <Icon name={'ios-restaurant'} size={25} />
        )
    },
  },
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: 'orange'
  },
  hideStatusBar:true
});

const MyApp = createAppContainer(MyDrawerNavigator);

function App(){
  return (
    <MyApp />
  )
}
export default App