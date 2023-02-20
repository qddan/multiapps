import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const onLogin = () => {
    navigation.navigate('Home', {username});
  };

  const onChangeUsername = text => {
    setUsername(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>User name</Text>
      <TextInput
        value={username}
        onChangeText={onChangeUsername}
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} />
      <TouchableOpacity style={styles.btnLogin} onPress={onLogin}>
        <Text style={styles.txtLogin}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  label: {
    color: 'black',
    marginTop: 20,
  },
  btnLogin: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  txtLogin: {
    color: 'white',
    textAlign: 'center',
  },
});
