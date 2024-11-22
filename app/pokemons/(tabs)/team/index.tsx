import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  Vibration,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import useTypes from "@/hook/useTypes";
import CustomPicker from "@/components/Modal";

const TeamForm = () => {
  const types = useTypes();
  const [selectedType, setSelectedType] = useState("");

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert("Erreur", "Veuillez sélectionner un type.");
      return;
    }

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

      setTimeout(async () => {
        try {
          const wildResponse = await fetch(
            "https://pokebuildapi.fr/api/v1/pokemon"
          );
          const wildPokemons = await wildResponse.json();
          const randomWildPokemon =
            wildPokemons[Math.floor(Math.random() * wildPokemons.length)];

          Vibration.vibrate(500);
          Alert.alert(
            "Un Pokémon sauvage est apparu !",
            `Un ${randomWildPokemon.name} sauvage est apparu.`
          );

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
          }, 3000);
        } catch (error) {
          Alert.alert("Erreur", "Impossible de récupérer un Pokémon sauvage.");
        }
      }, Math.random() * (30000 - 3000) + 3000);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de récupérer les Pokémon.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionnez un type</Text>
      <CustomPicker
        options={types}
        selectedValue={selectedType}
        onValueChange={setSelectedType}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ajouter à votre équipe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
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

export default TeamForm;
