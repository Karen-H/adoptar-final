import React, { Component } from 'react';
import { 
  View, 
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import t from 'tcomb-form-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import realm from '../database';
import { addUser } from '../database';

const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  orgName: t.maybe(t.String),
  email: t.String,
  pass: t.String,
  repeatpass: t.String,
});

const Contacto = t.struct({
  wp: t.maybe(t.Number),
  tel: t.maybe(t.Number),
  ig: t.maybe(t.String),
  fb: t.maybe(t.String),
  tw: t.maybe(t.String),
});

const userOptions = {
  i18n: {
    optional: '',
    required: '*',
  },
  fields: {
      name: {
      label: 'Nombre',
      placeholder: "Florencia",
    },
    orgName: {
      label: 'Nombre de la Organización',
      placeholder: "PawLogo"
    },
    email: {
      label: 'Correo',
      placeholder: 'pawlogo@gmail.com',
      //error: 'Ingrese un correo válido'
    },
    pass: {
      label: 'Contraseña',
      placeholder: '**************',
      //error: 'Ingrese una contraseña válida',
      secureTextEntry: true
    },
    repeatpass: {
      label: 'Repetir Contraseña',
      placeholder: '**************',
      //error: 'Ingrese una contraseña válida',
      secureTextEntry: true
    },
  },
};

const contactOptions = {
  i18n: {
    optional: '',
    required: '',
  },
  fields: {
    wp: {
      label: 'WhatsApp',
      placeholder: '11 1234-5678',
    },
    tel: {
      label: 'Teléfono',
      placeholder: '11 1234-5678',
    },
    ig: {
      label: 'Instagram',
      placeholder: 'instagram.com/pawlogo',
      error: 'Ingrese una cuenta válida (ejemplo: instagram.com/pawlogo)'
    },
    fb: {
      label: 'Facebook',
      placeholder: 'facebook.com/pawlogo',
      error: 'Ingrese una cuenta válida (ejemplo: facebook.com/pawlogo)'
    },
    tw: {
      label: 'Twitter',
      placeholder: 'twitter.com/pawlogo',
      error: 'Ingrese una cuenta válida (ejemplo: twitter.com/pawlogo)'
    },
  },
};

let userName = '';
let userOrgName = '';
let userEmail = '';
let userPass = '';
let userWp = '';
let userTel = '';
let userIg = '';
let userFb = '';
let userTw = '';

 
class RegisterScreenInfo extends Component {
  handleSubmit = () => {
    const {navigation} = this.props;
    const value = this._form.getValue();
    if(value) {
      console.log('value: ', value);
      navigation.navigate('RegisterContact');
      userName = value.name;
      userOrgName = value.orgName;
      userEmail = value.email;
      userPass = value.pass;
    }
  }

  render() {
    return (
      <ScrollView>

        <View style = {styles.logo}>
          <Image source={require('@img/logo-login.png')}/>
        </View>

        <View>
          <Text style={styles.title}>Información Básica</Text>
        </View>

        <View style={styles.container}>
          <Form 
            ref={c => this._form = c}
            type={User} 
            options={userOptions}
          />
        </View>

        <View style = {styles.Botones}>
          <TouchableOpacity style = {styles.Boton} onPress = {this.handleSubmit}>
            <Text style = {styles.textoBoton}>Continuar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

    );
  }
};

class RegisterScreenContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realm: null,
    }
  }

  handleSubmit = () => {
    const {navigation} = this.props;
    const value = this._form.getValue();
    console.log('value: ', value);
    navigation.navigate('Home2');
    userWp = value.wp;
    userTel = value.tel;
    userIg = value.ig;
    userFb = value.fb;
    userTw = value.tw;
    addUser(userName,userOrgName,userEmail,userPass,userWp,userTel,userIg,userFb,userTw);
  }

  render() {
    return (
      <ScrollView>

        <View style = {styles.logo}>
          <Image source={require('@img/logo-login.png')}/>
        </View>

        <View>
          <Text style={styles.title}>Contacto</Text>
        </View>

        <View style={styles.container}>
          <Form 
            ref={c => this._form = c}
            type={Contacto} 
            options={contactOptions}
          />
        </View>

        <View style = {styles.Botones}>
          <TouchableOpacity style = {styles.Boton} onPress = {this.handleSubmit}>
            <Text style = {styles.textoBoton}>Registrarse</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      );
    }
  }
  
const styles = StyleSheet.create({
  logo: {
    marginBottom: 30,
    marginTop: 30,
    alignItems: "center",
  },

  container: {
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 22,
    marginRight: 22,
  },

  Boton: {
    backgroundColor: "#520065",
    height: 60,
    width: 350,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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

  title: {
    marginLeft: 22,
    fontSize: 22,
    color: "#520065",
    fontFamily: "Roboto-Light"
  }
});

export {
  RegisterScreenInfo,
  RegisterScreenContact
};
