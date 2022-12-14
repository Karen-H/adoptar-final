import React, {Component} from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import t from 'tcomb-form-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { addPet, loggedIn } from '../database';
var ImagePicker = require('react-native-image-picker');
import Geocode from "react-geocode";

const Form = t.form.Form;

const Type = t.enums({
  cat: 'Gato',
  dog: 'Perro',
  other: 'Otro'
})

const Provincia = t.enums({
  ba: 'Buenos Aires',
  caba: 'Ciudad Autónoma de Buenos Aires',
  ca: 'Catamarca',
  cha: 'Chaco',
  chu: 'Chubut',
  cba: 'Córdoba',
  co: 'Corrientes',
  er: 'Entre Ríos',
  fo: 'Formosa',
  ju: 'Jujuy',
  lp: 'La Pampa',
  lr: 'La Rioja',
  mza: 'Mendoza',
  mis: 'Misiones',
  nqn: 'Neuquén',
  rn: 'Río Negro',
  sa: 'Salta',
  sj: 'San Juan',
  sl: 'San Luis',
  sc: 'Santa Cruz',
  sf: 'Santa Fe',
  sde: 'Santiago del Estero',
  tdf: 'Tierra del Fuego',
  tu: 'Tucumán'
})

const Barrio = t.enums({
  agronomia: 'Agronomía',
  almagro: 'Almagro',
  balvanera: 'Balvanera',
  barracas: 'Barracas',
  belgrano: 'Belgrano',
  boedo: 'Boedo',
  caballito: 'Caballito',
  chacarita: 'Chacarita',
  coghlan: 'Coghlan',
  colegiales: 'Colegiales',
  constitucion: 'Constitución',
  flores: 'Flores',
  floresta: 'Floresta',
  laboca: 'La Boca',
  lapaternal: 'La Paternal',
  liniers: 'Liniers',
  mataderos: 'Mataderos',
  montecastro: 'Monte Castro',
  montserrat: 'Montserrat',
  nuevapompeya: 'Nueva Pompeya',
  nuñez: 'Nuñez',
  palermo: 'Palermo',
  parqueavellaneda: 'Parque Avellaneda',
  parquechacabuco: 'Parque Chacabuco',
  parquechas: 'Parque Chas',
  parquepatricios: 'Parque Patricios',
  puertomadero: 'Puerto Madero',
  recoleta: 'Recoleta',
  retiro: 'Retiro',
  saavedra: 'Saavedra',
  sancristobal: 'San Cristóbal',
  sannicolas: 'San Nicolás',
  santelmo: 'San Telmo',
  versalles: 'Versalles',
  villacrespo: 'Villa Crespo',
  villadevoto: 'Villa Devoto',
  villageneralmitre: 'Villa General Mitre',
  villalugano: 'Villa Lugano',
  villaluro: 'Villa Luro',
  villaortuzar: 'Villa Ortúzar',
  villapueyrredon: 'Villa Pueyrredón',
  villareal: 'Villa Real',
  villariachuelo: 'Villa Riachuelo',
  villasantarita: 'Villa Santa Rita',
  villasoldati: 'Villa Soldati',
  villaurquiza: 'Villa Urquiza',
  villadelparque: 'Villa del Parque',
  velezsarsfield: 'Vélez Sarsfield'
})

const Pet = t.struct({
  name: t.String,
  type: Type,
  age: t.String,
  breed: t.String,
  provincia: Provincia,
  barrio: Barrio,
});

const petOptions = {
  i18n: {
    optional: '',
    required: '*',
  },
  fields: {
    name: {
      label: 'Nombre',
      placeholder: "Angie",
    },
    type: {
      label: 'Tipo',
      nullOption: {value: '', text: 'Seleccionar'}
    },
    age: {
      label: 'Edad',
      placeholder: "6 meses",
    },
    breed: {
      label: 'Raza',
      placeholder: 'Border Collie',
    },
    provincia: {
      label: 'Provincia',
      nullOption: {value: '', text: 'Seleccionar'}
    },
    barrio: {
      label: 'Barrio',
      nullOption: {value: '', text: 'Seleccionar'}
    },
  },
};

let petName = '';
let petType = '';
let petAge = '';
let petBreed = '';
let petProvincia = '';
let petBarrio = '';
let petLat = '';
let petLong = '';


class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

export default class AgregarScreen extends Component {
  state = {
    photo: null,
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log("response", response);
      this.setState({photo: response.assets[0].uri});
    });
  };

  handleSubmit = () => {
    const {navigation} = this.props;
    const {photo} = this.state;
    const value = this._form.getValue();

    if(value) {
      console.log('value: ', value);
      navigation.navigate('Agregados');
      petName = value.name;
      petType = value.type;
      petAge = value.age;
      petBreed = value.breed;
      petProvincia = value.provincia;
      petBarrio = value.barrio;

      Geocode.setApiKey("AIzaSyC3fzbzYfjdsKVAM6L2NbvdSrb9IKTVE9Y");
      Geocode.setLanguage("es");
      Geocode.setRegion("ar");
      Geocode.setLocationType("ROOFTOP");
      Geocode.enableDebug();

      // Get latitude & longitude from address.
      Geocode.fromAddress(petProvincia.concat(" ", petBarrio)).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          petLat = lat.toString();
          petLong = lng.toString();

          console.log("LATITUD: ", petLat);
          console.log("LONGITUD: ", petLong);

          loggedIn()
          .then(response => { 
            addPet(response, petName,petType,petAge,petBreed,petProvincia,petBarrio,petLat,petLong,photo);
          })
          .catch(error => {
            console.error(error);
          })

        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  render(){
    const {navigation} = this.props;
    const {photo} = this.state;
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

            <View>
            <Text style={styles.title}>Datos de la mascota</Text>
            </View>

            <View style={styles.container}>


              <TouchableOpacity style = {styles.botonSubirFoto} onPress = {this.handleChoosePhoto}>
                <Text style = {styles.textoBoton}>Subir Foto</Text>
              </TouchableOpacity>
              
              <View style = {styles.fotoContainer}>
                <Image source={require('@img/upload-32.png')} style = {styles.iconoAdopcion}/>
                <ImageLoader
                  source={{uri: photo}}
                  style={styles.foto}
                />
              </View>

              <Form 
                ref={c => this._form = c}
                type={Pet} 
                options={petOptions}
              /> 

            </View>

            <View style = {styles.Botones}>
              <TouchableOpacity style = {styles.Boton} onPress = {this.handleSubmit}>
                <Text style = {styles.textoBoton}>Agregar</Text>
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

  textoBienvenida: {
    color: "#520065",
    fontSize: 25,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 37,
    fontFamily: "Roboto-Medium"
  },

  burgerBoton: {
    marginTop: 20,
    marginLeft: 22
  },

  container: {
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 22,
    marginRight: 22,
  },

  Boton: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
    marginBottom: 20,
    backgroundColor: "#520065",
    height: 60,
    width: 369,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  
  botonSubirFoto: {
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
    backgroundColor: "#520065",
    height: 50,
    width: 150,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  foto: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 0,

  },

  fotoContainer: {
    backgroundColor: "#EBEBEB",
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: "#BFBFBF",
    width: 145,
    height: 145,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  
  textoBoton: {
    color: "white",
    fontSize: 22,
    fontFamily: "Roboto-Medium"
  },

  title: {
    marginTop: -5,
    marginLeft: 22,
    fontSize: 22,
    color: "#520065",
    fontFamily: "Roboto-Light"
  },

  overlayAdopcion: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F8EDFF",
    opacity: 0.75,
  },

  iconoAdopcion: {
    position: "absolute",
  },

  textoBotonAdopcion: {
    textAlign: 'center',
    color: "black",
    fontSize: 28,
    position: "absolute",
    fontFamily: "Roboto-Medium",
    bottom: -15
  },

  image: {
    width: 369,
    height: 369,
    resizeMode: 'cover'
  },

});
