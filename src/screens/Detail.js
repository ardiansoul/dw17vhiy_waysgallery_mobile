import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
} from 'react-native';
import {API} from '../utils/API';
import HTML from 'react-native-render-html';
export default function Detail({route}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {id} = route.params;

  const fetchData = async () => {
    const response = await API.get(`/post/${id}`);
    console.log('detail', response);
    const result = response.data.data.post;
    setData(result);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading || !data ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data.photos}
            horizontal
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {
              return (
                <View style={styles.imageWrapper}>
                  <Image
                    source={{uri: item.image}}
                    key={item.id}
                    style={styles.image}
                  />
                </View>
              );
            }}
          />
          <View style={styles.contentWrapper}>
            <Text style={styles.Title}>{data?.title}</Text>
            <HTML source={{html: data?.description}} contentWidth={width} />
          </View>
        </>
      )}
    </View>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width: width,
    height: height * (1 / 3),
    padding: 20,
    borderColor: '#000',
    borderWidth: 2,
  },
  image: {
    margin: 10,
    height: null,
    width: null,
    flex: 1,
    resizeMode: 'contain',
  },
  contentWrapper: {
    width: width,
    height: height * (2 / 3),
    padding: 20,
  },
  Title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
