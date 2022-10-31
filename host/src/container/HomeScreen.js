import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  const onPressAppProduct = () => {
    navigation.navigate('MiniApp1');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressAppProduct} style={styles.moduleButton}>
        <Text style={styles.text}>Mini App 1</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressAppProduct} style={styles.moduleButton}>
        <Text style={styles.text}>Mini App 2</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPressAppProduct} style={styles.moduleButton}>
        <Text style={styles.text}>Mini App 3</Text>
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
    backgroundColor: 'gray',
    marginTop: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
