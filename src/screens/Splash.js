import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth'
const imageBaseUrl = require('../assets/images/logo.png');

const Splash = ({ navigation }) => {
  useEffect(() => {
    // AsyncStorage.removeItem('user')
    //let user = auth().currentUser?.uid;
    isLogin()

  }, [])

  const isLogin = async () => {
    const isLogIn = await AsyncStorage.getItem('user')
    setTimeout(() => {
      if (isLogIn) {
        console.log('userInfo ... ',JSON.parse(isLogIn));
        navigation.replace('Users', { userInfo: JSON.parse(isLogIn) })
      } else {
        navigation.replace('Login')
      }
    }, 1000);
  }
  return (
    <View style={styles.container}>
      <Image source={imageBaseUrl} resizeMode='center' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});


export default Splash;
