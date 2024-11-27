import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import usePokemonDetails from "@/hook/usePokemonsDetails";
import usePokemonEvolutions from "@/hook/usePokemonsEvolution";
import { getTypeColor } from "@/utils/TypeColors";

const screenHeight = Dimensions.get("window").height;

const statNames = {
  HP: "HP",
  attack: "Attack",
  defense: "Defense",
  special_attack: "Sp. Atk",
  special_defense: "Sp. Def",
  speed: "Speed",
};

const PokemonDetails = () => {
  const { id } = useLocalSearchParams();
  const { pokemon, loading } = usePokemonDetails(id as string);
  const { evolutions, loading: loadingEvolutions } = usePokemonEvolutions(
    id as string
  );
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
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>
          Impossible de charger les détails du Pokémon.
        </Text>
      </View>
    );
  }

  const headerColor = getTypeColor(pokemon.apiTypes);

  const renderStatBar = (statValue: number) => {
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "stats":
        return (
          <View style={styles.baseStatsContainer}>
            {Object.entries(pokemon.stats).map(([key, value]) => (
              <View key={key} style={styles.statRow}>
                <Text style={styles.statLabel}>{statNames[key] || key}</Text>
                <Text style={styles.statValue}>{value}</Text>
                {renderStatBar(value as number)}
              </View>
            ))}
          </View>
        );
      case "resistances":
        return (
          <View style={styles.resistanceGrid}>
            {pokemon.apiResistances.map((resistance) => (
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
        );
      case "evolution":
        return (
          <View style={styles.evolutionContainer}>
            {loadingEvolutions ? (
              <Text style={styles.loadingText}>Loading evolutions...</Text>
            ) : evolutions && evolutions.length > 0 ? (
              evolutions.map((evolution) => (
                <TouchableOpacity
                  key={evolution.pokedexId}
                  style={styles.evolutionItem}
                >
                  <Image
                    source={{ uri: evolution.image }}
                    style={styles.evolutionImage}
                  />
                  <Text style={styles.evolutionName}>{evolution.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noEvolutionText}>
                No evolutions available
              </Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: headerColor }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>{pokemon.name}</Text>
          <View style={styles.typesContainer}>
            {pokemon.apiTypes.map((type) => (
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
      <View style={[styles.tabs, { paddingTop: 20 }]}>
        {["stats", "resistances", "evolution"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>{renderTabContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    height: screenHeight * 0.35,
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 20,
    position: "relative",
  },
  headerContent: { alignItems: "flex-start", marginBottom: 20 },
  name: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  typesContainer: { flexDirection: "row", marginTop: 8 },
  typeBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  typeText: { color: "#fff", fontSize: 14, fontWeight: "600" },
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
    bottom: -50,
    zIndex: 2,
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
  activeTab: { borderBottomColor: "#81c784" },
  tabText: { fontSize: 16, fontWeight: "500", color: "#333" },
  tabContent: { flex: 1, padding: 20, height: "100%", backgroundColor: "#fff" },
  baseStatsContainer: { marginBottom: 20 },
  statRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
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
  statBarFill: { height: "100%", backgroundColor: "#4caf50" },
  resistanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  resistanceItem: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    width: "20%",
  },
  resistanceIcon: { width: 40, height: 40, marginBottom: 5 },
  resistanceMultiplier: { fontSize: 14, color: "#555", textAlign: "center" },
  evolutionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  evolutionItem: { width: "48%", alignItems: "center", marginBottom: 20 },
  evolutionImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  evolutionName: { fontSize: 14, fontWeight: "600", color: "#555" },
  noEvolutionText: { fontSize: 16, color: "#888", textAlign: "center" },
});

export default PokemonDetails;
