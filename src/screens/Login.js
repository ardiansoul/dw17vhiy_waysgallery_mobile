import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {base} from '../assets/image';
import {Button, InputText} from '../components/atoms';
import {LoginForm} from '../components/molecules';

export default function Login() {
  return (
    <LinearGradient
      colors={['#2fc4b2', '#145d54']}
      style={styles.linearGradient}>
      <View style={styles.imageContainer}>
        <Image source={base} style={styles.image} />
      </View>
      <LoginForm />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 50,
    width: 300,
    height: 300,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
});
