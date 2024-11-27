import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getTypeColor } from "@/utils/TypeColors";

type PokemonCardProps = {
  pokemon: {
    id: number;
    name: string;
    apiTypes: { name: string }[];
    image: string;
  };
  onPress: () => void;
};

const PokemonCard = ({ pokemon, onPress }: PokemonCardProps) => {
  const backgroundColor = getTypeColor(pokemon.apiTypes);
  const reversedTypes = [...pokemon.apiTypes].reverse();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, { backgroundColor }]}
    >
      {/* Pokémon ID */}
      <Text style={styles.pokemonId}>
        #{String(pokemon.id).padStart(3, "0")}
      </Text>

      {/* Pokémon Details */}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.typeContainer}>
          {reversedTypes.map((type) => (
            <View key={type.name} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Pokémon Image */}
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
