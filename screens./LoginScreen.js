import React, { Component } from 'react';
import t from 'tcomb-form-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { 
    View, 
    Text,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import { authenticate, loggedIn } from '../database';

const Form = t.form.Form;

const User = t.struct({
    email: t.String,
    pass: t.String,
});

const options = {
  fields: {
    email: {
      label: 'Correo',
      placeholder: 'pawlogo@gmail.com',
      //error: 'Ingrese un correo válido'
    },
    pass: {
      label: 'Contraseña',
      placeholder: '************',
      //error: 'Ingrese una contraseña válida',
      secureTextEntry: true
    },
  },
};

let userEmail = '';
let userPass = '';

export default class LoginScreen extends Component {

  handleSubmit = () => {
    const {navigation} = this.props;
    const value = this._form.getValue();
    if(value){
      userEmail = value.email;
      userPass = value.pass;
      authenticate(userEmail, userPass)
      .then(response => { 
        //console.log(response);
        console.log('value: ', value);
        navigation.navigate('Home2');
      })
      .catch(error => {
        console.error(error);
      })
      loggedIn()
      .then(response => { 
        console.log('User ID: ', response);
      })
      .catch(error => {
        console.error(error);
      })
    }
  } 

  render() { 
    const {navigation} = this.props;
    return (
      <ScrollView>

        <View style = {styles.logo}>
          <Image source={require('@img/logo3-150.png')}/>
        </View>

        <View style={styles.container}>
          <Form 
            ref={c => this._form = c}
            type={User} 
            options={options}
          />
        </View>

        <View style = {styles.Botones}>
          <TouchableOpacity style = {styles.Boton} onPress = {this.handleSubmit}>
            <Text style = {styles.textoBoton}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style = {styles.forgotPass} onPress = {() => Alert.alert("Oops")}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity onPress = {() => navigation.navigate('RegisterInfo')}>
            <Text style = {styles.noAccount}>¿No tenés una cuenta?</Text>
            <Text style = {styles.registerButton}>Registrate</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    );
  };
};
  
const styles = StyleSheet.create({
  logo: {
    marginBottom: 60,
    marginTop: 50,
    alignItems: "center",
  },

  container: {
    justifyContent: 'center',  
    marginLeft: 22,
    marginRight: 21,
  },

  Boton: {
    backgroundColor: "#520065",
    height: 60,
    width: 350,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  Botones: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20
  },

  textoBoton: {
    color: "white",
    fontSize: 22,
    fontFamily: "Roboto-Medium"
  },

  forgotPass: {
    color: "#520065",
    fontSize: 18,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 90,
    fontFamily: "Roboto-Light"
  },

  noAccount: {
    textAlign: 'center',
    color: "#520065",
    fontSize: 18,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Roboto-Medium"
  },

  registerButton: {
    textAlign: 'center',
    color: "#520065",
    fontSize: 18,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Roboto-Light"
  },

});