import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import usePokemons from "@/hook/usePokemons";

const PokemonsByType = () => {
  const { type } = useLocalSearchParams();
  const allPokemons = usePokemons();
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.apiTypes.some((t: any) => t.name === type)
  );

  const renderPokemon = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon de type {type}</Text>
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PokemonsByType;
