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
        <Image style={{width: 80, height: 80}} source={{uri: imageUrl}} />
        <Text style={{margin: 10}}>{item.name}</Text>
      </View>
    );
  };

  const listHeader = () => {
    return (
      <View>
        {!!username && <Text style={styles.hiLabel}>Hi, {username}</Text>}
        <View style={styles.banner}>
          <View>
            <Text numberOfLines={2} style={styles.hiLabel}>
              Pikachu
            </Text>
            <Text style={styles.subLabel}>Pika - Pika, Pikachu!</Text>
          </View>
          <Image
            style={styles.bannerImage}
            source={{
              uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
            }}
          />
        </View>
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
            ListHeaderComponent={listHeader}
            data={pokemon}
            numColumns={2}
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
  banner: {
    backgroundColor: '#F8EC99',
    height: 200,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bannerImage: {
    width: 200,
    height: 200,
  },
  subLabel: {
    color: 'black',
    fontSize: 18,
    fontWeight: '400',
    marginHorizontal: 20,
  },
});
