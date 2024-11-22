import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`pokemons/search/${query.trim()}`);
    }
  };

  return (
    <View style={styles.searchBar}>
      <Ionicons name="search" size={20} color="#000" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Rechercher un Pokémon"
        placeholderTextColor="#999"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
