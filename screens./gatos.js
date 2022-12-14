import React, {Component} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { 
  View, 
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import realm from '../database';
import t from 'tcomb-form-native';
import { getAllPets, getAllUsers, getAllCats, getAllCatsCount } from '../database';

const Form = t.form.Form;

const Type = t.enums({
  cat: 'Gato',
  dog: 'Perro',
  other: 'Otro'
})

const Breed = t.enums({
    sin: 'Sin raza',
    siames: 'Siames',
    korat: 'Korat'
  })

const Pet = t.struct({
    type: Type,
    breed: Breed,
  });

const petOptions = {
    i18n: {
      optional: '',
      required: '*',
    },
    fields: {
      type: {
        label: 'Tipo',
        nullOption: {value: '', text: 'Seleccionar'}
      },
      breed: {
        label: 'Raza',
        nullOption: {value: '', text: 'Seleccionar'}
      },
    },
  };
  
  let petType = '';
  let petBreed = '';

export default class GatosScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      pets: [],
      users: [],
      count: '',
    };

    this.Users();
  }

  Users = () => {
    getAllUsers()
    .then(response => { 
      this.setState({users: response});
    })
    .catch(error => {
      console.error(error);
    });
  }


  handleSubmit = () => {
    const {navigation} = this.props;
    const value = this._form.getValue();

    if(value) {
      console.log('value: ', value);
      navigation.navigate('Gatos');
      petType = value.type;
      petBreed = value.breed;


        getAllCats()
        .then(response => { 
          this.setState({pets: response});
        })
        .catch(error => {
          console.error(error);
        });
    
        getAllCatsCount()
        .then(response => { 
          this.setState({count: response});
        })
        .catch(error => {
          console.error(error);
        });

   


    }
  }


  renderItem = ({item}) => {
    return (
      <View>

          <View>
            <Text>Contacto</Text>
            <Text>{item.userName}</Text>
            <Text>{item.userEmail}</Text>
          </View>

      </View>
    )
  }

  

  render(){
    const {navigation} = this.props;

    return (

      <View>

        <View>

            <Text>Gatos sin raza: {this.state.count}</Text>
        

            <Form 
                ref={c => this._form = c}
                type={Pet} 
                options={petOptions}
            /> 

            <View style = {styles.Botones}>
                <TouchableOpacity style = {styles.Boton} onPress = {this.handleSubmit}>
                    <Text style = {styles.textoBoton}>Aplicar filtro</Text>
                </TouchableOpacity>
            </View>

        </View>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
        >



          { this.state.pets.map(pet => (
            
            <Marker
              coordinate={{
                latitude: parseFloat(pet.petLatitud),
                longitude: parseFloat(pet.petLongitud),
              }}
              image={require('@img/pin_128.png')}
              title={pet.petName}
              description='This is the description'
            >
              <Callout tooltip>
                <View>
                  <View style={styles.bubble}>
                    <Text style={styles.name}>{pet.petName}</Text>
                    <Text style={styles.age}>{pet.petAge}</Text>

                    <Text 
                    style={{ height: 130, position: "relative" }}>
                      <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={{uri: pet.petPicture}}
                      />
                  </Text>

                  <View>
                    <FlatList
                        data = { this.state.users.filter(user => user.userId === pet.userId) }
                        keyExtractor = {(item) => item.userId + '_' + item.userName}
                        renderItem = {this.renderItem}
                        numColumns={1}
                    />
                  </View>

                  </View>
                  <View style={styles.arrowBorder}/>
                  <View style={styles.arrow}/>
                </View>
              </Callout>
            </Marker>
            
          )) }


        </MapView>
      </View>

    );
  };
};


const styles = StyleSheet.create({
  map: {
    height: '100%'
  },

  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },

  arrow: {
    backgroundColor: 'tranparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },

  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -0.5,
    // marginBottom: -15,
  },

  name: {
    fontSize: 20,
    //marginBottom: 5,
  },

  age: {
    fontSize: 16,
    marginBottom: -25,
  },

  image: {
    width: 120,
    height: 80,
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

  

});
