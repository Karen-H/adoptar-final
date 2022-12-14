import React, {Component} from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import realm from '../database';
import { getPets, deletePet, getCats, getDogs, getOthers, loggedIn } from '../database';
import  {PanGestureHandler,PinchGestureHandler} from 'react-native-gesture-handler'
const tag ='[GESTURE]'

export default class AgregadosScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      pets: [],
      isLoading: true,
      modalVisible: false,
      cats: null,
      dogs: null,
      others: null,
      activePet: '',
    };
    this.reloadData();
    realm.addListener('change', () => {
      this.reloadData();
    });
  }

  setModalVisibility(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  showModal = (item) => {
    this.setModalVisibility(true);
    this.setState({activePet: item});
  }

  showAlert(item) {  
    Alert.alert(  
        'Atención',  
        'Está a punto de eliminar esta mascota',  
        [  
            {  
              text: 'Cancelar',  
              onPress: () => console.log('Cancel Pressed'),  
              style: 'cancel',  
            },  

            {
              text: 'Eliminar', 
              onPress: () => deletePet(item.petId)
            }, 
        ]  
    );  
  }  

  reloadData = () => {
    loggedIn()
    .then(response => { 
    
      getPets(response).then((pets) => {
        this.setState({pets, isLoading: false});
      }).catch((error) => {
        this.setState({pets: []});
        reject(error);
      });
      getCats(response).then((cats) => {
        this.setState({cats, isLoading: false});
      }).catch((error) => {
        this.setState({cats: null});
        reject(error);
      });
      getDogs(response).then((dogs) => {
        this.setState({dogs, isLoading: false});
      }).catch((error) => {
        this.setState({dogs: null});
        reject(error);
      });
      getOthers(response).then((others) => {
        this.setState({others, isLoading: false});
      }).catch((error) => {
        this.setState({others: null});
        reject(error);
      });
      console.log('reloadData');

    })
    .catch(error => {
      console.error(error);
    })

  }

  translateX = new Animated.Value(0)
  translateY = new Animated.Value(0)
  scale  = new Animated.Value(1)
 
    // handleGesture = Animated.event([{nativeEvent: {translationX: this.translateX,translationY:this.translateY,scale:this.scale}}], { useNativeDriver: true });
    handleGesture = Animated.event([{nativeEvent: {scale:this.scale}}], { useNativeDriver: true });
     _onGestureStateChange = (event)=>{
    console.log(tag,event.nativeEvent)
    this.scale.setValue(event.nativeEvent.scale)
     }


  renderItem = ({item}) => {

    return (
      <View>

        <TouchableOpacity style = {styles.renderItems} 
            onPress = {() => this.showModal(item)} 
            onLongPress = {() => this.showAlert(item)}>
          <Image source={{uri: item.petPicture}} style={styles.pictureMini}/>
          <View style={styles.info}>
            <Text style={styles.infoText}>{item.petName}</Text>
          </View>
        </TouchableOpacity>

        <View>
          
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => this.setModalVisibility(!this.state.modalVisible)}
              >
                <View style={styles.modalContainer}>
                  <Image source={{uri: this.state.activePet.petPicture}} style={styles.pictureModal}/>
                  <View style={styles.modalInfo}>
                    <View style={styles.modalColumn}>
                      <Text style={styles.infoTitle}>Nombre</Text>
                      <Text style={styles.infoData}>{this.state.activePet.petName}</Text>
                      <Text style={styles.infoTitle}>Edad</Text>
                      <Text style={styles.infoData}>{this.state.activePet.petAge}</Text>
                    </View>
                    <View>
                      <Text style={styles.infoTitle}>Raza</Text>
                      <Text style={styles.infoData}>{this.state.activePet.petBreed}</Text>
                      <Text style={styles.infoTitle}>Barrio</Text>
                      <Text style={styles.infoData}>{this.state.activePet.petBarrio}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.cerrarModal} onPress={() => this.setModalVisibility(!this.state.modalVisible)}>
                    <Image source={require('@img/close_modal_22.png')}/>
                  </TouchableOpacity>
                </View>
              </Modal>
          
        </View>

      </View>
    )
  }

  render(){
    const {navigation} = this.props;

    let circleTransformStyle 
    circleTransformStyle = {
            transform:[
                {
                    translateY : this.translateY
                },
                {
                    translateX : this.translateX
                }
            ]
        }

    let scaleStyle = {
        transform:[
            { perspective: 200 },
            {
                scale :  this.scale
            }
        ]
    }
    
    return (
      this.state.isLoading ? 
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' color='#520065' animating/>
      </View> :
      
        <View style={{flex:1}}>
  
          <View style = {styles.top}>
            <TouchableOpacity style = {styles.burgerBoton} onPress={this.props.navigation.openDrawer}>
              <Image source={require('@img/burger2.png')}/>
            </TouchableOpacity>
            <View style = {styles.logo}>
              <Image source={require('@img/logo-home2.png')}/>
            </View>
          </View>

          <View style = {styles.count}>
            <Image source={require('@img/perro_30.png')}/>
            <Text style={styles.countText}>{this.state.dogs}</Text>
            <Image source={require('@img/gato_30.png')}/>
            <Text style={styles.countText}>{this.state.cats}</Text>
            <Image source={require('@img/tortuga_30.png')}/>
            <Text style={styles.countText}>{this.state.others}</Text>
          </View>

          <PinchGestureHandler onGestureEvent={this.handleGesture} onHandlerStateChange={this._onGestureStateChange}>
            <Animated.View style = {[styles.boxes, scaleStyle]}>
              <FlatList
                data = {this.state.pets}
                keyExtractor = {(item) => item.petId + '_' + item.petName}
                renderItem = {this.renderItem}
                numColumns={2}
                columnWrapperStyle={styles.box}
              />
            </Animated.View>
          </PinchGestureHandler>

        </View>
    );
  };
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 13,
    position: "absolute",
    alignSelf: 'center'
  },

  top: {
    backgroundColor: 'white',
    height: 55,
    marginBottom: 15,
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

  renderItems: {
    //marginLeft: "auto",
    //marginRight: "auto",
    //flexDirection: 'row',
    margin: 5,
    backgroundColor: "#B99BC1",
    borderRadius: 6,
    padding: 10,
    width: 180,
    alignItems: 'center',
  },

  pictureMini: {
    width: 100, 
    height: 100, 
    margin: 5,
    borderRadius: 6,
    marginRight: 10,
  },

  pictureModal: {
    width: 200, 
    height: 200, 
    margin: 5,
    borderRadius: 20,
  },

  info: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },

  infoText: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    color: '#520065'
  },

  infoTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    marginTop: 15,
    color: '#520065',
    textAlign: 'center',
  },

  infoData: {
    fontFamily: 'Roboto-Light',
    fontSize: 18,
    textAlign: 'center',
  },

  borrar: {
    position: 'absolute',
    top: 5,
    right: 5
  },

  modalContainer: {
    margin: 50,
    backgroundColor: "#EBEBEB",
    //borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 200,
    //marginTop: 70,
    marginTop: "auto",
    marginBottom: "auto",
    //backgroundColor: "#A69BC1",
  },

  modalInfo: {
    flexDirection: 'row',
  },

  modalColumn: {
    marginRight: 60
  },

  cerrarModal: {
    position: 'absolute',
    top: 15,
    right: 15
  },

  count: {
    flexDirection: 'row',
    marginBottom: 15,
    marginLeft: 125
  },

  countText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: '#520065',
    marginTop: 3,
    marginLeft: 5,
    marginRight: 5
  },

  boxes: {
    flex: 1,
  },

  box: {
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingVertical: 5.5
  },

});