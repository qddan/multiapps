import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>ProfileScreen module in App Host</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'orange',
  },
});
