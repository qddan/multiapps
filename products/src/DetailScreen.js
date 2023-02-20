import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetailScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>DetailScreen</Text>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 30,
    color: 'green',
    margin: 10,
  },
});
