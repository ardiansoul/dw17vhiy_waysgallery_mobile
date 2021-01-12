import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, InputText, TextFeedback} from '../atoms';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../Context/AppContext';

export default function LoginForm() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {signIn} = useContext(AppContext);

  const handleLogin = async () => {
    try {
      await signIn({email, password});
    } catch (err) {
      console.log({error: {err}});
    }
  };
  return (
    <View style={styles.container}>
      <InputText
        icon="user"
        label="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <InputText
        icon="key"
        label="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <Button onPress={() => handleLogin()} text="Login" />
      <TextFeedback
        onPress={() => {
          navigation.navigate('register');
        }}>
        not have an account
      </TextFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 500,
    alignItems: 'center',
  },
});
