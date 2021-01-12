import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './navigation/TabNavigation';
import {Detail, Login, Register} from './screens';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContext} from './Context/AppContext';
import {API} from './utils/API';

const Stack = createStackNavigator();

export default function App() {
  const setAuthToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      console.log(API.defaults.headers.common);
      API.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common.Authorization;
    }
  };

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.payload.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userEmail: action.payload.email,
          userToken: action.payload.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userEmail: null,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const response = await API.post('/login', data);
          const result = response.data.data;
          console.log(result);
          await AsyncStorage.setItem('userToken', result.token);
          setAuthToken();
          dispatch({type: 'LOGIN', payload: result});
        } catch (err) {
          console.log({err});
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          dispatch({type: 'LOGOUT'});
        } catch (err) {
          console.log(err);
        }
      },
      signUp: async (data) => {
        try {
          const response = await API.post('/register', data);
          const result = response.data.data;
          console.log(result);
          await AsyncStorage.setItem('userToken', result.token);
          dispatch({type: 'LOGIN', payload: result});
        } catch (err) {
          console.log(err);
        }
      },
    }),
    [],
  );

  const loadUser = async () => {
    try {
      const response = await API.get('check-auth');
      console.log(response);

      if (response.status === 401) {
        return dispatch({
          type: 'LOGOUT',
        });
      }

      await AsyncStorage.setItem('userToken', response.data.data.token);
      dispatch({
        type: 'RETRIEVE_TOKEN',
        payload: response.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'LOGOUT',
      });
    }
  };

  useEffect(() => {
    setAuthToken();
    loadUser();
  }, []);

  return (
    <AppContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.isLoading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : !loginState.userToken ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="appTab" component={TabNavigation} />
          </Stack.Navigator>
        ) : (
          <>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="appTab" component={TabNavigation} />
              <Stack.Screen name="detail" component={Detail} />
            </Stack.Navigator>
          </>
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
