import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ContainerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Container Mini App</Text>
    </View>
  );
};

export default ContainerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
});
