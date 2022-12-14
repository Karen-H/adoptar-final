import React, {Component} from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  BackHandler,
  Alert
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


export default class HomeScreen2 extends Component {

  backAction = () => {
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

    render(){
        const {navigation} = this.props;
        return (
            <ScrollView>
      
                <View style = {styles.top}>
                  <TouchableOpacity style = {styles.burgerBoton} onPress={this.props.navigation.openDrawer}>
                    <Image source={require('@img/burger2.png')}/>
                  </TouchableOpacity>
                  <View style = {styles.logo}>
                    <Image source={require('@img/logo-home2.png')}/>
                  </View>
                </View>
                

      
                <View style = {styles.Botones}>
                    <TouchableOpacity style = {styles.botonAgregar} onPress = {() => navigation.navigate('Agregar')}>
                        <Image source={require('@img/agregar_boton.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.botonAgregados} onPress = {() => navigation.navigate('Agregados')}>
                        <Image source={require('@img/agregados_boton.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.botonPerfil} onPress = {() => navigation.navigate('Perfil')}>
                        <Image source={require('@img/perfil_boton.png')}/>
                    </TouchableOpacity>
                </View>
      
            </ScrollView>
        );
    };
  };

const styles = StyleSheet.create({
  logo: {
    marginTop: 13,
    marginLeft: 124,
    position: "absolute",
  },

  top: {
    backgroundColor: 'white',
    height: 55,
    marginBottom: 20,
  },

  botonAgregar: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  botonAgregados: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  botonPerfil: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  Botones: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  textoBotonAgregar: {
    textAlign: 'center',
    color: "white",
    fontSize: 22,
    position: "absolute",
    bottom: 46,
    fontFamily: "Roboto-Regular",
  },

  textoBotonAgregados: {
    textAlign: 'center',
    color: "white",
    fontSize: 22,
    position: "absolute",
    bottom: 46,
    fontFamily: "Roboto-Regular",
  },

  textoBotonPerfil: {
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
    marginBottom: 27,
    fontFamily: "Roboto-Medium"
  },

  textoNecesitas: {
    color: "#520065",
    fontSize: 30,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },

  iconoAgregar: {
    position: "absolute",
    top: 46,
  },

  iconoAgregados: {
    position: "absolute",
    top: 46,
  },

  iconoPerfil: {
    position: "absolute",
    top: 46,
  },

  overlayAgregar: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#240060",
    borderRadius: 6,
    opacity: 0.65,
  },

  overlayAgregados: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#5D0060",
    borderRadius: 6,
    opacity: 0.65,
  },

  overlayPerfil: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000F60",
    borderRadius: 6,
    opacity: 0.65,
  },

  burgerBoton: {
    marginTop: 20,
    marginLeft: 22
  }

});
