import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import usePokemonDetails from "@/hook/usePokemonsDetails";

const SearchResult = () => {
  const { query } = useLocalSearchParams();
  const { pokemon, loading } = usePokemonDetails(query);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Aucun Pokémon trouvé pour "{query}".</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.image }} style={styles.image} />
      <Text style={styles.name}>{pokemon.name}</Text>
      <Text style={styles.description}>ID: {pokemon.id}</Text>
      <Text style={styles.description}>{pokemon.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 4,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default SearchResult;
