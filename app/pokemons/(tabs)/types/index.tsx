import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import useTypes from "@/hook/useTypes";

const TypeList = () => {
  const router = useRouter();
  const types = useTypes();

  const handleTypePress = (typeName: string) => {
    router.push(`pokemons/types/byType/${typeName}`);
  };

  const renderType = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleTypePress(item.name)}
      style={styles.card}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderEmptyItem = () => (
    <View style={[styles.card, styles.emptyCard]} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tous les Types</Text>
      <FlatList
        data={types}
        keyExtractor={(item) => item.name}
        renderItem={renderType}
        numColumns={4}
        key="numColumns-4"
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={renderEmptyItem}
        ListEmptyComponent={renderEmptyItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    alignItems: "center",
    margin: 8,
    width: "20%",
    aspectRatio: 1,
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  listContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  emptyCard: {
    backgroundColor: "transparent",
  },
});

export default TypeList;
