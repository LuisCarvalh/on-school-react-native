import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import loginUser from '@/src/services/user';

export default function Login() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleButtonPress = async () => {
    try {
      const response = await loginUser(user, password);
      if(response.ok){
        const token = response.token;
        navigation.navigate('Post', { token });
      }else {
        errorHandler();
      }
    } catch (error) {
      errorHandler();
    }
  };

  const errorHandler = () => {
    Alert.alert('Erro', 'Erro ao realizar o login!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
});