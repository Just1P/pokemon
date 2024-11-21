import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import usePokemons from "@/hook/usePokemons";

const PokemonList = () => {
  const pokemons = usePokemons();

  const renderPokemon = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.typeContainer}>
        {item.apiTypes.map((type: any) => (
          <View key={type.name} style={styles.typeCard}>
            <Image source={{ uri: type.image }} style={styles.typeImage} />
            <Text style={styles.typeText}>{type.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tous les Pokémon</Text>
      <FlatList
        data={pokemons}
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
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  typeCard: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 4,
  },
  typeImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  typeText: {
    fontSize: 14,
    color: "#555",
  },
});

export default PokemonList;
