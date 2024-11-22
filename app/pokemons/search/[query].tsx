import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import usePokemonDetails from "@/hook/usePokemonsDetails";

const screenHeight = Dimensions.get("window").height;

const statNames = {
  HP: "HP",
  attack: "Attack",
  defense: "Defense",
  special_attack: "Sp. Atk",
  special_defense: "Sp. Def",
  speed: "Speed",
};

const typeColors = {
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

const getTypeColor = (types) => {
  if (types?.length > 1) {
    return typeColors[types[1]?.name] || "#ccc";
  }
  return typeColors[types[0]?.name] || "#ccc";
};

const PokemonDetails = () => {
  const { query } = useLocalSearchParams();
  const { pokemon, loading } = usePokemonDetails(query);
  const [activeTab, setActiveTab] = useState("stats");
  const [typeImages, setTypeImages] = useState({});

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://pokebuildapi.fr/api/v1/types");
        const types = await response.json();
        const typeMap = types.reduce((acc, type) => {
          acc[type.name] = type.image;
          return acc;
        }, {});
        setTypeImages(typeMap);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Aucun Pokémon trouvé pour "{query}".</Text>
      </View>
    );
  }

  const headerColor = getTypeColor(pokemon.apiTypes);

  const renderStatBar = (statValue) => {
    const statPercentage = Math.min((statValue / 100) * 100, 100);
    const barColor = statValue < 50 ? "#F08030" : "#78C850";
    return (
      <View style={styles.statBarContainer}>
        <View
          style={[
            styles.statBarFill,
            { width: `${statPercentage}%`, backgroundColor: barColor },
          ]}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: headerColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <View style={styles.typesContainer}>
            {pokemon.apiTypes?.map((type) => (
              <View key={type.name} style={styles.typeBadge}>
                <Text style={styles.typeText}>{type.name}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.pokemonId}>
            #{pokemon.id.toString().padStart(3, "0")}
          </Text>
        </View>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setActiveTab("stats")}
          style={[styles.tab, activeTab === "stats" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "stats" && styles.activeTabText,
            ]}
          >
            Base Stats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("resistances")}
          style={[styles.tab, activeTab === "resistances" && styles.activeTab]}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "resistances" && styles.activeTabText,
            ]}
          >
            Resistances
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === "stats" && (
          <View style={styles.baseStatsContainer}>
            {Object.entries(pokemon.stats).map(([key, value]) => (
              <View key={key} style={styles.statRow}>
                <Text style={styles.statLabel}>{statNames[key] || key}</Text>
                <Text style={styles.statValue}>{value}</Text>
                {renderStatBar(value)}
              </View>
            ))}
          </View>
        )}
        {activeTab === "resistances" && (
          <View style={styles.resistanceGrid}>
            {pokemon.apiResistances?.map((resistance) => (
              <View key={resistance.name} style={styles.resistanceItem}>
                {typeImages[resistance.name] && (
                  <Image
                    source={{ uri: typeImages[resistance.name] }}
                    style={styles.resistanceIcon}
                  />
                )}
                <Text style={styles.resistanceMultiplier}>
                  {resistance.damage_multiplier}x
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: screenHeight * 0.35,
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  headerContent: {
    alignItems: "flex-start",
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  typesContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  typeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  typeText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  pokemonId: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 0.8)",
    position: "absolute",
    top: 10,
    right: 20,
  },
  image: {
    width: 200,
    height: 200,
    position: "absolute",
    alignSelf: "center",
    bottom: -30,
    zIndex: 3,
  },
  tabs: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#81c784",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  tabContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  baseStatsContainer: {
    padding: 20,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  statValue: {
    width: 40,
    textAlign: "right",
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginRight: 10,
  },
  statBarContainer: {
    flex: 3,
    height: 7,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    overflow: "hidden",
  },
  statBarFill: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  resistanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  resistanceItem: {
    flexBasis: "18%", // 5 items par ligne avec marges
    alignItems: "center",
    marginBottom: 20,
  },
  resistanceIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  resistanceMultiplier: {
    fontSize: 14,
    color: "#555",
  },
});

export default PokemonDetails;
