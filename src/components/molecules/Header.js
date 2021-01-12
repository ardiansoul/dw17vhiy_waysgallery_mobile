import React, {useCallback, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {profile} from '../../assets/image';
import {API} from '../../utils/API';

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchdata = async () => {
      try {
        const response = await API.get('/user');
        console.log('response user', response);
        const result = response.data.data;
        setData(result);
      } catch (err) {
        console.log({err});
      }
    };
    fetchdata();
    setIsLoading(false);
    // return () => {
    //   setData(null);
    //   setIsLoading(false);
    // };
  }, []);
  return (
    <View style={styles.header}>
      {isLoading || !data ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <>
          <View style={styles.imageWrapper}>
            {data.avatar === null ? (
              <Image source={profile} style={styles.icon} />
            ) : (
              <Image source={{uri: data.avatar}} style={styles.icon} />
            )}
          </View>
          <View style={styles.biodata}>
            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 25}}>
              Hello, {data?.fullName}
            </Text>
            <View style={styles.barWrapper}>
              <View style={styles.itemWrapper}>
                {!data.posts ? (
                  <Text style={styles.itemText}>0</Text>
                ) : (
                  <Text style={styles.itemText}>{data?.posts.length}</Text>
                )}
                <Text style={styles.itemText}>Posts</Text>
              </View>
              <View style={styles.itemWrapper}>
                {!data.arts ? (
                  <Text style={styles.itemText}>0</Text>
                ) : (
                  <Text style={styles.itemText}>{data?.arts.length}</Text>
                )}
                <Text style={styles.itemText}>Arts</Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    // borderColor: '#000',
    // borderWidth: 2,
    height: 300,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  imageWrapper: {
    width: 250,
    height: 250,
    margin: 25,
  },
  icon: {
    width: 250,
    height: 250,
    borderRadius: 50,
  },
  biodata: {
    flexDirection: 'column',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: '#000',
  },
  barWrapper: {
    padding: 20,
    height: 150,
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: '#000',
  },
  itemWrapper: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    height: 100,
    width: 100,
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
