import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, InputText, TextFeedback} from '../atoms';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../Context/AppContext';

export default function LoginForm() {
  const navigation = useNavigation();
  const {signUp} = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleLogin = async () => {
    try {
      await signUp({email, password, fullName});
    } catch (err) {
      console.log({error: {err}});
    }
  };
  return (
    <View style={styles.container}>
      <InputText
        icon="user"
        label="Full Name"
        value={fullName}
        onChangeText={(text) => {
          setFullName(text);
        }}
      />
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
      <Button onPress={() => handleLogin()} text="Register" />
      <TextFeedback
        onPress={() => {
          navigation.navigate('login');
        }}>
        have an account
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
