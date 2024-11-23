import React from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
import usePokemons from "@/hook/usePokemons";
import useTypes from "@/hook/useTypes";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";

const Home = () => {
  const router = useRouter();
  const pokemons = usePokemons();
  const types = useTypes();

  const randomPokemons = pokemons.sort(() => 0.5 - Math.random()).slice(0, 6);
  const randomTypes = types.sort(() => 0.5 - Math.random()).slice(0, 3);

  const navigateToPokemonList = () => {
    router.push("pokemons");
  };

  const navigateToTypeList = () => {
    router.push("/pokemons/(tabs)/types");
  };

  const handlePokemonPress = (id: number) => {
    router.push(`pokemons/details/${id}`);
  };

  const renderPokemon = ({ item }: { item: any }) => (
    <PokemonCard pokemon={item} onPress={() => handlePokemonPress(item.id)} />
  );

  const renderType = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => router.push(`pokemons/types/byType/${item.name}`)}
      style={[styles.card, styles.typeCard, { backgroundColor: "#D3E8FF" }]}
    >
      <Image source={{ uri: item.image }} style={styles.typeImage} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Header />
      <SearchBar />
      <TouchableOpacity
        onPress={navigateToPokemonList}
        style={styles.touchable}
      >
        <Text style={styles.sectionTitle}>Pokémons aléatoires</Text>
      </TouchableOpacity>
      <FlatList
        data={randomPokemons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.grid}
      />
      <TouchableOpacity onPress={navigateToTypeList} style={styles.touchable}>
        <Text style={styles.sectionTitle}>Types aléatoires</Text>
      </TouchableOpacity>
      <FlatList
        data={randomTypes}
        key={`numColumns-${3}`}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderType}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/pokemons/random")}
      >
        <Text style={styles.buttonText}>Voir un Pokémon Aléatoire</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/pokemons/(tabs)/team")}
      >
        <Text style={styles.buttonText}>Accéder au Combat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  touchable: {
    marginVertical: 10,
  },
  grid: {
    justifyContent: "space-between",
    flexGrow: 1,
  },
  typeCard: {
    height: 110,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    margin: 10,
  },
  typeImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 5,
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
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
