import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import usePokemons from "@/hook/usePokemons";
import useTypes from "@/hook/useTypes";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  const router = useRouter();
  const pokemons = usePokemons();
  const types = useTypes();

  const randomPokemons = pokemons.sort(() => 0.5 - Math.random()).slice(0, 6);
  const randomTypes = types.sort(() => 0.5 - Math.random()).slice(0, 3);

  const navigateToRandomPokemon = () => {
    if (pokemons.length > 0) {
      const randomPokemon =
        pokemons[Math.floor(Math.random() * pokemons.length)];
      router.push(`pokemons/details/${randomPokemon.id}`);
    }
  };

  const navigateToPokemonList = () => {
    router.push("pokemons");
  };

  const navigateToTypeList = () => {
    router.push("/pokemons/(tabs)/types");
  };

  const handlePokemonPress = (id: number) => {
    router.push(`pokemons/details/${id}`);
  };

  const navigateToTeamForm = () => {
    router.push("/pokemons/(tabs)/team");
  };

  const handleTypePress = (typeName: string) => {
    router.push(`pokemons/types/byType/${typeName}`);
  };

  const renderPokemon = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handlePokemonPress(item.id)}
      style={[styles.card, { backgroundColor: getTypeColor(item.apiTypes) }]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderType = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleTypePress(item.name)}
      style={[styles.card, { backgroundColor: "#D3E8FF" }]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

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

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar style={styles.searchBar} />
      <TouchableOpacity
        onPress={navigateToPokemonList}
        style={styles.touchable}
      >
        <Text style={styles.sectionTitle}>Pokémons aléatoires</Text>
      </TouchableOpacity>
      <FlatList
        data={randomPokemons}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity onPress={navigateToTypeList} style={styles.touchable}>
        <Text style={styles.sectionTitle}>Types aléatoires</Text>
      </TouchableOpacity>
      <FlatList
        data={randomTypes}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderType}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.button} onPress={navigateToRandomPokemon}>
        <Text style={styles.buttonText}>Voir un Pokémon Aléatoire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToTeamForm}>
        <Text style={styles.buttonText}>Accéder au Combat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
  },
  searchBar: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2a9df4",
    marginVertical: 10,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
  touchable: {
    marginVertical: 10,
    backgroundColor: "#eef4ff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  card: {
    flex: 1,
    flexDirection: "column",
    margin: 8,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    height: 150,
    width: 120,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  listContainer: {
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Home;
