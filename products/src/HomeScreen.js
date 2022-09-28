import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

function HomeScreen({username}) {
  const isDarkMode = useColorScheme() === 'dark';

  const [pokemon, setPokemon] = useState([]);
  const [nextPokemonUrl, setNextPokemonUrl] = useState('');

  const getPokemon = async url => {
    const res = await fetch(url);
    const data = await res.json();

    setNextPokemonUrl(data.next);
    setPokemon(prevState => {
      return [...prevState, ...data?.results];
    });
  };

  const onloadMore = () => {
    if (nextPokemonUrl) getPokemon(nextPokemonUrl);
  };

  useEffect(() => {
    getPokemon('https://pokeapi.co/api/v2/pokemon/?limit=30');
  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? 'gray' : 'white',
  };

  const zeroPad = (num, places) => String(num).padStart(places, '0');

  const renderItem = ({item, index}) => {
    const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroPad(
      index + 1,
      3,
    )}.png`;
    return (
      <View style={styles.item}>
        <FastImage
          style={{width: 80, height: 80}}
          source={{uri: imageUrl}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={{margin: 10}}>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={backgroundStyle}>
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? 'black' : 'white',
          }}>
          <FlatList
            ListHeaderComponent={
              !!!username && <Text style={styles.hiLabel}>Hi, {username}</Text>
            }
            data={pokemon}
            numColumns={3}
            onEndReachedThreshold={0.7}
            onEndReached={onloadMore}
            renderItem={renderItem}
            keyExtractor={(item, idx) => `${idx}`}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  hiLabel: {
    color: 'black',
    fontSize: 28,
    fontWeight: '600',
    margin: 20,
  },
  item: {
    height: 100,
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    backgroundColor: '#EEE',
  },
});
