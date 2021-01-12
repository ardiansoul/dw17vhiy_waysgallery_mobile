import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {API} from '../utils/API';
import {Post} from '../components/molecules';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await API.get('/posts');
      console.log('response', response);
      const result = response.data.data.posts;
      setData(result);
    } catch (err) {
      console.log({err});
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setIsLoading(false);
    return () => {
      setIsLoading(true);
      setIsLoading(false);
    };
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView>
          <FlatList
            contentContainerStyle={styles.container}
            data={data}
            numColumns={2}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={(post) => {
              return <Post item={post.item} key={post.index} />;
            }}
          />
        </ScrollView>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
