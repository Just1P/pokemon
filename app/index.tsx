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

  const renderPokemon = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handlePokemonPress(item.id)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderType = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => router.push(`types/byType/${item.name}`)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity onPress={navigateToPokemonList}>
        <Text style={styles.sectionTitle}>Pokémons aléatoires</Text>
      </TouchableOpacity>
      <FlatList
        data={randomPokemons}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPokemon}
      />
      <TouchableOpacity onPress={navigateToTypeList}>
        <Text style={styles.sectionTitle}>Types aléatoires</Text>
      </TouchableOpacity>
      <FlatList
        data={randomTypes}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderType}
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
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  card: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Home;
