import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
  },
});
