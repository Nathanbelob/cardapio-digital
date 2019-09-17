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
  Image,

} from 'react-native';
import Cervejas from "./screens/Cervejas";
import Drinks from "./screens/Drinks";
import Home from "./screens/Home";
import Porcoes from "./screens/Porcoes";

const CustomDrawerComponent = ({items, ...props}) => (
    <SafeAreaView style={{flex: 1}}>
      <View style={{height:150, backgroundColor:'gray', alignItems:'center', justifyContent:'center', marginBottom:10}}>
        <Image source={require('./assets/logo-bar.jpeg')} style={{height: 120, width:120, borderRadius:60}}/>
      </View>
      <ScrollView>
      <Text style={{textAlign:'center'}}>Bebidas</Text>
        <DrawerNavigatorItems {...props}
        items={items.filter(item => item.routeName === "Cervejas" || item.routeName === "Drinks")}
        />
        <View style={{width:'90%', alignSelf: 'center', height:1, backgroundColor: 'gray', margin: 15}}></View> 
        <Text style={{textAlign:'center'}}>Comidas</Text>
        <DrawerNavigatorItems {...props}
        items={items.filter(item => item.routeName === "Porções")}
        />
      </ScrollView>
    </SafeAreaView>
)

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen:Home,
    navigationOptions: {
      drawerLabel: () => null,
    },
  },
  Cervejas: {
    screen:Cervejas,
    navigationOptions: {
      title: 'Cervejas',
      drawerLabel: 'Cervejas',
      drawerIcon: () => (
        <Icon name={'ios-beer'} size={25} />
        )
    },
  },
  Drinks: {
    screen:Drinks,
    navigationOptions: {
      title: 'Drinks',
      drawerLabel: 'Drinks',
      drawerIcon: () => (
        <Icon name={'ios-wine'} size={25} />
        )
    },
  },
  Porções: {
    screen:Porcoes,
    navigationOptions: {
      drawerLabel: 'Porções',
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