import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';

export default function Button({text, onPress}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: 150,
    height: 50,
    backgroundColor: '#2fc4b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 24,
  },
});
