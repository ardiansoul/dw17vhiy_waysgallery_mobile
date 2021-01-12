import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

export default function Post({item}) {
  const navigation = useNavigation();

  return (
    <View style={styles.postWrapper}>
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate('detail', {
            id: item.id,
          })
        }>
        <Image source={{uri: item.photos[0].image}} style={styles.image} />
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  postWrapper: {
    shadowColor: '#2ecc71',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    height: 300,
    width: 250,
    margin: 10,
  },
  image: {
    borderRadius: 10,
    width: 250,
    height: 300,
  },
});
