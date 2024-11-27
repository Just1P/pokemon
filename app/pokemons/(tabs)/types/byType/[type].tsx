import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import usePokemons from "@/hook/usePokemons";
import PokemonCard from "@/components/PokemonCard";

const PokemonsByType = () => {
  const { type } = useLocalSearchParams();
  const allPokemons = usePokemons();

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.apiTypes.some((t: any) => t.name === type)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon de type {type}</Text>
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={item}
            onPress={() => console.log(`${item.name} clicked`)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    margin: 16,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 8,
  },
});

export default PokemonsByType;
