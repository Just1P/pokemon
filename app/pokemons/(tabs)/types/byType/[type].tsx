import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import usePokemons from "@/hook/usePokemons";

const typeColors: { [key: string]: string } = {
  Plante: "#78C850",
  Feu: "#F08030",
  Eau: "#6890F0",
  Insecte: "#A8B820",
  Normal: "#A8A878",
  Poison: "#A040A0",
  Électrik: "#F8D030",
  Sol: "#E0C068",
  Fée: "#EE99AC",
  Combat: "#C03028",
  Psy: "#F85888",
  Roche: "#B8A038",
  Spectre: "#705898",
  Glace: "#98D8D8",
  Dragon: "#7038F8",
  Ténèbres: "#705848",
  Acier: "#B8B8D0",
  Vol: "#A890F0",
};

const PokemonsByType = () => {
  const { type } = useLocalSearchParams();
  const allPokemons = usePokemons();
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.apiTypes.some((t: any) => t.name === type)
  );

  const getTypeColor = (types: any[]) => {
    if (types.length > 1) {
      return typeColors[types[1]?.name] || "#ccc";
    }
    return typeColors[types[0]?.name] || "#ccc";
  };

  const renderPokemon = ({ item }: { item: any }) => {
    const backgroundColor = getTypeColor(item.apiTypes);
    const reversedTypes = [...item.apiTypes].reverse();

    return (
      <TouchableOpacity style={[styles.card, { backgroundColor }]}>
        <View style={styles.leftContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.typeContainer}>
            {reversedTypes.map((type: any) => (
              <View key={type.name} style={styles.typeBadge}>
                <Text style={styles.typeText}>{type.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <Image source={{ uri: item.image }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokémon de type {type}</Text>
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  stickyHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  activeSection: {
    borderRadius: 8,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    margin: 8,
    borderRadius: 12,
    padding: 16,
    alignItems: "flex-start",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 130,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  typeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
    alignSelf: "flex-start",
  },
  typeText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    position: "absolute",
    bottom: 8,
    right: 8,
  },
  grid: {
    justifyContent: "space-between",
  },
});

export default PokemonsByType;
