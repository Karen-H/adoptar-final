import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class HomeScreen extends Component {

  render() {
    const {navigation} = this.props;
    return (
      <ScrollView>

        <View style = {styles.logo}>
          <Image source={require('@img/logo3-150.png')}/>
        </View>

        <View>
          <Text style = {styles.textoBienvenida}>¡Bienvenido!</Text>
          <Text style = {styles.textoNecesitas}>¿Qué necesitás?</Text>
        </View>

        <View style = {styles.Botones}>
          <TouchableOpacity style = {styles.botonAdopcion} onPress = {() => navigation.navigate('Adoption')}>
            <Image source={require('@img/dar_boton.png')}/>
            <View style={styles.overlayAdopcion} />
            <Image source={require('@img/dar_icono.png')} style = {styles.iconoAdopcion}/>
            <Text style = {styles.textoBotonAdopcion}>Dar en {"\n"} Adopción</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.botonAdoptar} onPress = {() => navigation.navigate('Adopt')}>
            <Image source={require('@img/adoptar_boton.png')}/>
            <View style={styles.overlayAdoptar} />
            <Image source={require('@img/adoptar_icono.png')} style = {styles.iconoAdoptar}/>
            <Text style = {styles.textoBotonAdoptar}>Adoptar</Text>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.botonAdopcion} onPress = {() => navigation.navigate('Gatos')}>
            <Image source={require('@img/dar_boton.png')}/>
            <View style={styles.overlayAdopcion} />
            <Image source={require('@img/dar_icono.png')} style = {styles.iconoAdopcion}/>
            <Text style = {styles.textoBotonAdopcion}>Gatos {"\n"} Sin raza</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  }

  };

const styles = StyleSheet.create({
  logo: {
    marginBottom: 30,
    marginTop: 30,
    alignItems: "center",
  },

  botonAdopcion: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  botonAdoptar: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  Botones: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  textoBotonAdopcion: {
    textAlign: 'center',
    color: "white",
    fontSize: 22,
    position: "absolute",
    bottom: 35,
    fontFamily: "Roboto-Regular",
  },

  textoBotonAdoptar: {
    textAlign: 'center',
    color: "white",
    fontSize: 22,
    position: "absolute",
    bottom: 46,
    fontFamily: "Roboto-Regular",
  },

  textoBienvenida: {
    color: "#520065",
    fontSize: 25,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Roboto-Medium",
  },

  textoNecesitas: {
    color: "#520065",
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
    fontFamily: "Roboto-Light",
  },

  iconoAdopcion: {
    position: "absolute",
    top: 36,
  },

  iconoAdoptar: {
    position: "absolute",
    top: 46,
  },

  overlayAdopcion: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#240060",
    borderRadius: 6,
    opacity: 0.65,
  },

  overlayAdoptar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#5D0060",
    borderRadius: 6,
    opacity: 0.65,
  }

});