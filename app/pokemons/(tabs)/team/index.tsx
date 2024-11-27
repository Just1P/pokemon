import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Vibration,
  ActivityIndicator,
} from "react-native";
import useTypes from "@/hook/useTypes";

const TeamForm = () => {
  const types = useTypes();
  const [selectedType, setSelectedType] = useState("");
  const [step, setStep] = useState(0);

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert("Erreur", "Veuillez sélectionner un type.");
      return;
    }

    setStep(1);

    try {
      const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon`);
      const pokemons = await response.json();
      const pokemonsOfType = pokemons.filter((pokemon) =>
        pokemon.apiTypes.some((type: any) => type.name === selectedType)
      );
      const randomPokemon =
        pokemonsOfType[Math.floor(Math.random() * pokemonsOfType.length)];

      Vibration.vibrate(500);
      Alert.alert(
        "Ajouté à votre équipe",
        `${randomPokemon.name} a rejoint votre team !`
      );

      setStep(2);

      const wildResponse = await fetch(
        "https://pokebuildapi.fr/api/v1/pokemon"
      );
      const wildPokemons = await wildResponse.json();
      const randomWildPokemon =
        wildPokemons[Math.floor(Math.random() * wildPokemons.length)];

      const wildAppearanceDelay = Math.floor(Math.random() * 21) + 10; // Random delay between 10-30 seconds
      const combatDuration = Math.floor(Math.random() * 21) + 10; // Random combat duration between 10-30 seconds

      setTimeout(() => {
        Vibration.vibrate(500);
        Alert.alert(
          "Un Pokémon sauvage est apparu !",
          `Un ${randomWildPokemon.name} sauvage est apparu.`
        );

        setStep(3);

        setTimeout(() => {
          const teamStats =
            randomPokemon.stats.attack + randomPokemon.stats.speed;
          const wildStats =
            randomWildPokemon.stats.attack + randomWildPokemon.stats.speed;

          const result =
            teamStats > wildStats
              ? "Votre Pokémon a gagné !"
              : "Votre Pokémon a perdu.";

          Vibration.vibrate(500);
          Alert.alert("Résultat du combat", result);

          setStep(0);
        }, combatDuration * 1000); // Delay for combat duration
      }, wildAppearanceDelay * 1000); // Delay for wild Pokémon appearance
    } catch (error) {
      Alert.alert("Erreur", "Impossible de récupérer les données.");
      setStep(0);
    }
  };

  const renderType = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, selectedType === item.name && styles.selectedCard]}
      onPress={() => setSelectedType(item.name)}
    >
      <Image source={{ uri: item.image }} style={styles.typeIcon} />
      <Text style={styles.typeText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez un type</Text>
      <FlatList
        data={types}
        renderItem={renderType}
        keyExtractor={(item) => item.name}
        numColumns={4}
        contentContainerStyle={styles.listContainer}
      />

      {step > 0 ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>
            {step === 1
              ? "Ajout à l'équipe..."
              : step === 2
              ? "Recherche d'un Pokémon sauvage..."
              : "Combat en cours..."}
          </Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter à votre équipe</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#D6EAF8",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    margin: 8,
    width: "20%",
    aspectRatio: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCard: {
    backgroundColor: "#3498DB",
    borderColor: "#2980B9",
  },
  typeIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  typeText: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
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
  loaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007AFF",
  },
});

export default TeamForm;
