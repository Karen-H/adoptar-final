import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdoptScreen from './screens/AdoptScreen';
import AgregarScreen from './screens/AgregarScreen';
import AgregadosScreen from './screens/AgregadosScreen';
import PerfilScreen from './screens/PerfilScreen';
import AyudaScreen from './screens/AyudaScreen';
import HomeScreen from './screens/HomeScreen';
import HomeScreen2 from './screens/HomeScreen2';
import LoginScreen from './screens/LoginScreen';
import GatosScreen from './screens/gatos';
import {RegisterScreenInfo, RegisterScreenContact} from './screens/RegisterScreen';
import React, { Component } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Image, Alert, useWindowDimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Drawer = createDrawerNavigator();

function CustomDrawer(props) {
  const {navigation} = props;
  return(
    <ScrollView style = {styles.container}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity style = {styles.burgerBoton} onPress={navigation.closeDrawer}>
          <Image source={require('@img/burger2.png')}/>
        </TouchableOpacity>
        <DrawerItemList 
          labelStyle = {{fontFamily: 'Roboto-Medium', color: "#520065", fontSize: 18}} 
          activeBackgroundColor = 'rgba(82, 0, 101, 0.1)'
          {...props}
        />
        <DrawerItem 
          style = {{marginTop: 200}}
          labelStyle = {{fontFamily: 'Roboto-Medium', color: "#520065", fontSize: 18}} 
          label="Cerrar Sesión" 
          onPress = {() => navigation.navigate('Home')} 
          icon = {() => <Image source={require('@img/cerrar-15.png')} style={{marginRight: -23}}/>}
        />
      </DrawerContentScrollView>
    </ScrollView>
  )
}

function MyDrawer() {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  return(
    <Drawer.Navigator 
      drawerStyle={isLargeScreen ? null : { width: 210, backgroundColor: '#F6F6F6' }}
      initialRouteName="Home2" 
      screenOptions = {{ swipeEnabled: false }} 
      drawerContent = {props => <CustomDrawer {...props}/>}
    >
      <Drawer.Screen name="Home2" component={HomeScreen2} options= {{ headerShown: false,
        drawerIcon: () => (
          <Image source={require('@img/home-15.png')} style={{marginRight: -23}}/>)          
       }}/>
      <Drawer.Screen name="Agregar" component={AgregarScreen} options= {{ headerShown: false,
        drawerIcon: () => (
          <Image source={require('@img/mas-15.png')} style={{marginRight: -23}}/>)
       }}/>
      <Drawer.Screen name="Agregados" component={AgregadosScreen} options= {{ headerShown: false,
        drawerIcon: () => (
          <Image source={require('@img/menu-15.png')} style={{marginRight: -23}}/>)
       }}/>
      <Drawer.Screen name="Perfil" component={PerfilScreen} options= {{ headerShown: false,
        drawerIcon: () => (
          <Image source={require('@img/usuario-15.png')} style={{marginRight: -23}}/>)
       }}/>
      <Drawer.Screen name="Ayuda" component={AyudaScreen} options= {{ headerShown: false,
        drawerIcon: () => (
          <Image source={require('@img/ayuda-15.png')} style={{marginRight: -23}}/>)
       }}/>
    </Drawer.Navigator>
  )
}

const Stack = createStackNavigator();

export default class MyStack extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions = {{ headerShown: false }}>
          <Stack.Screen name = "Home" component = { HomeScreen } />
          <Stack.Screen name = "Home2" component = { MyDrawer } />
          <Stack.Screen name = "Adoption" component = { LoginScreen } />
          <Stack.Screen name = "Adopt" component = { AdoptScreen } />
          <Stack.Screen name = "RegisterInfo" component = { RegisterScreenInfo } />
          <Stack.Screen name = "RegisterContact" component = { RegisterScreenContact } />
          <Stack.Screen name = "Agregar" component = { AgregarScreen } />
          <Stack.Screen name = "Agregados" component = { AgregadosScreen } />
          <Stack.Screen name = "Perfil" component = { PerfilScreen } />
          <Stack.Screen name = "Gatos" component = { GatosScreen } />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

const styles = StyleSheet.create({
  burgerBoton: {
    marginTop: 18,
    marginLeft: 18,
    marginBottom: 26
  },
  container: {
    marginLeft: 4,
  },
});