import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const PokemonCard = ({
  pokemon,
  onPress,
}: {
  pokemon: any;
  onPress: () => void;
}) => {
  const getTypeColor = (types: any[]) => {
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

    if (types.length > 1) {
      return typeColors[types[1]?.name] || "#ccc";
    }
    return typeColors[types[0]?.name] || "#ccc";
  };

  const backgroundColor = getTypeColor(pokemon.apiTypes);
  const reversedTypes = [...pokemon.apiTypes].reverse();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor }]}
    >
      {/* ID en haut à droite */}
      <Text style={styles.pokemonId}>
        #{String(pokemon.id).padStart(3, "0")}
      </Text>
      <View style={styles.leftContainer}>
        {/* Nom du Pokémon */}
        <Text style={styles.name}>{pokemon.name}</Text>
        {/* Types */}
        <View style={styles.typeContainer}>
          {reversedTypes.map((type: any) => (
            <View key={type.name} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type.name}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* Image du Pokémon */}
      <Image source={{ uri: pokemon.image }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
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
  pokemonId: {
    position: "absolute",
    top: 8,
    right: 8,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    opacity: 0.8,
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
});

export default PokemonCard;
