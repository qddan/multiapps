import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  const onPressAppProduct = () => {
    navigation.navigate('AppProducts');
  };
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>

      <TouchableOpacity onPress={onPressAppProduct} style={styles.moduleButton}>
        <Text>App Module</Text>
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
  },
});
