/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Text, Touch} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

function FAQ() {
  return (
    <Animated.View style={styles.root}>

      <LinearGradient
        colors={['#ebf4f5', '#b5c6e0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          {height: 60, width: 200, flexGrow: 1, marginVertical: 10, justifyContent: "center"},
          styles.item,
        ]}
      >
        <Text style = {styles.textoBoton}>¿Cómo agrego una mascota?</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#ebf4f5', '#b5c6e0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          {height: 60, width: 200, flexGrow: 1, marginVertical: 10, justifyContent: "center"},
          styles.item,
        ]}
      >
        <Text style = {styles.textoBoton}>¿Dónde puedo ver las mascotas agregadas?</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#ebf4f5', '#b5c6e0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          {height: 60, width: 200, flexGrow: 1, marginVertical: 10, justifyContent: "center"},
          styles.item,
        ]}
      >
        <Text style = {styles.textoBoton}>¿Cómo elimino una mascota agregada?</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#ebf4f5', '#b5c6e0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          {height: 60, width: 200, flexGrow: 1, marginVertical: 10, justifyContent: "center"},
          styles.item,
        ]}
      >
        <Text style = {styles.textoBoton}>¿Dónde puedo ver las mascotas en adopción?</Text>
      </LinearGradient>
      <LinearGradient
        colors={['#ebf4f5', '#b5c6e0']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          {height: 60, width: 200, flexGrow: 1, marginVertical: 10, justifyContent: "center"},
          styles.item,
        ]}
      >
        <Text style = {styles.textoBoton}>¿Puedo tener varias cuentas a mi nombre?</Text>
      </LinearGradient>
      
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 30,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  item: {
    borderRadius: 5,
    margin: 10,
    opacity: 0.9,
  },

  textoBoton: {
    color: "#520065",
    fontSize: 18,
    fontFamily: "Roboto-Medium",
  },
});

export default FAQ;