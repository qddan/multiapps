import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
// import {Button} from '../components/Button';

const HomeScreen = ({navigation}) => {
  const onPressAppProduct = () => {
    navigation.navigate('AppProducts');
  };

  const onPressProfile = () => {
    navigation.navigate('ProfileModule');
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      <TouchableOpacity onPress={onPressAppProduct} style={styles.moduleButton}>
        <Text style={styles.text}>App Module</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressProfile} style={styles.moduleButton}>
        <Text style={styles.text}>Profile Module</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moduleButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'orange',
    margin: 5,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
