import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';

export default function TextFeedback({children, onPress}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontSize: 20,
    color: '#fff',
  },
});
