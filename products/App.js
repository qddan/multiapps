import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} horizontal>
        {'quangdong'.split('').map((item, index) => {
          return <View key={index} style={styles.items}></View>;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  items: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  scroll: {
    flex: 1,
  },
});

export default App;
