import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import usePokemons from "@/hook/usePokemons";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";

const PokemonList = () => {
  const pokemons = usePokemons();
  const router = useRouter();
  const [activeGeneration, setActiveGeneration] = useState<number | null>(null);

  const generations = Array.from({ length: 8 }, (_, i) => i + 1);

  const toggleSection = (generation: number) => {
    if (activeGeneration === generation) {
      setActiveGeneration(null);
    } else {
      setActiveGeneration(generation);
    }
  };

  const renderPokemonCard = ({ item }: any) => (
    <PokemonCard
      pokemon={item}
      onPress={() => router.push(`/pokemons/details/${item.id}`)}
    />
  );

  const renderSection = (generation: number) => {
    const pokemonsInGeneration = pokemons.filter(
      (pokemon: any) => pokemon.apiGeneration === generation
    );

    if (activeGeneration !== generation) {
      return (
        <TouchableOpacity onPress={() => toggleSection(generation)}>
          <Text style={styles.sectionTitle}>Génération {generation}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <FlatList
        data={pokemonsInGeneration}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemonCard}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      {activeGeneration && (
        <View style={styles.stickyHeader}>
          <TouchableOpacity onPress={() => toggleSection(activeGeneration)}>
            <Text style={styles.stickyTitle}>
              Génération {activeGeneration}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={generations}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => renderSection(item)}
        contentContainerStyle={{ paddingTop: activeGeneration ? 50 : 0 }}
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
  grid: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
});

export default PokemonList;
