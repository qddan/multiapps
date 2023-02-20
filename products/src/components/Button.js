import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({label}) => {
  return (
    <TouchableOpacity style={styles.wrapper}>
      <Text style={styles.text}>{label ?? 'Button'}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'orange',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
