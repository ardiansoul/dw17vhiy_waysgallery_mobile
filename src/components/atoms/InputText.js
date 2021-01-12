import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function InputText({icon, label, ...props}) {
  return (
    <View style={styles.container}>
      <Icon name={icon} color={'#1abc9c'} size={30} />
      <TextInput style={styles.input} placeholder={label} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 50,
    paddingHorizontal: 10,
    width: 500,
    height: 70,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    borderColor: '#b5ede6',
    borderRadius: 7,
    borderWidth: 6,
  },
  input: {
    fontSize: 24,
    paddingLeft: 20,
    width: 400,
  },
});
