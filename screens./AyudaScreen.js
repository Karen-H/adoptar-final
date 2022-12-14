import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {gyroscope} from 'react-native-sensors';
import FAQ from './FAQ';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AyudaScreen = ({ navigation }) => {

  const gyroValue = useSharedValue({x: 0, y: 0, z: 0});
  const prev = useSharedValue({x: 0, y: 0});
  const derivedTranslations = useDerivedValue(() => {
    'worklet';
    const MAX_X = 40;
    const MAX_Y = 40;

    let newX = prev.value.x + gyroValue.value.y * -2;
    let newY = prev.value.y + gyroValue.value.x * -2;

    if (Math.abs(newX) >= MAX_X) {
      newX = prev.value.x;
    }
    if (Math.abs(newY) >= MAX_Y) {
      newY = prev.value.y;
    }
    prev.value = {
      x: newX,
      y: newY,
    };
    return {
      x: newX,
      y: newY,
    };
  }, [gyroValue.value]);

  useEffect(() => {
    const subscription = gyroscope.subscribe(({x, y, z, timestamp}) => {
      gyroValue.value = {x, y, z};
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [gyroValue.value]);

  const AnimatedStyles = {
    motion: useAnimatedStyle(() => {
      const inputRange = [-100, 0, 100];

      const outputRange = [-20, 0, 20];
      return {
        transform: [
          {
            translateX: withSpring(
              interpolate(
                derivedTranslations.value.x,
                inputRange,
                outputRange,
                Easing.bezier(0.16, 1, 0.3, 1),
              ),
            ),
          },
          {
            translateY: withSpring(
              interpolate(
                derivedTranslations.value.y,
                inputRange,
                outputRange,
                Easing.bezier(0.16, 1, 0.3, 1),
              ),
            ),
          },
        ],
      };
    }),
  };

    return (

      <SafeAreaView>

          <View style = {styles.top}>
            <TouchableOpacity style = {styles.burgerBoton} onPress={navigation.openDrawer}>
              <Image source={require('@img/burger2.png')}/>
            </TouchableOpacity>
            <View style = {styles.logo}>
              <Image source={require('@img/logo-home2.png')}/>
            </View>
          </View>

          <View>
            <Text style={styles.title}>FAQ</Text>
          </View>
        
        <View style={styles.cont}>
          <Animated.View style={AnimatedStyles.motion}>
            <FAQ />
          </Animated.View>
        </View>
      </SafeAreaView>

    );
};

const styles = StyleSheet.create({

  logo: {
    marginTop: 13,
    marginLeft: 124,
    position: "absolute",
  },

  title: {
    marginTop: -5,
    marginLeft: 22,
    fontSize: 22,
    color: "#520065",
    fontFamily: "Roboto-Light"
  },

  top: {
    backgroundColor: 'white',
    height: 55,
    marginBottom: 20,
  },

  burgerBoton: {
    marginTop: 20,
    marginLeft: 22
  },

  cont: {
    height: '100%',
    width: '100%',
    //backgroundColor: '#111',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


export default AyudaScreen;