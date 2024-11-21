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
    router.push(`types/byType/${typeName}`);
  };

  const renderType = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleTypePress(item.name)}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tous les Types</Text>
      <FlatList
        data={types}
        keyExtractor={(item) => item.name}
        renderItem={renderType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    alignItems: "center",
    margin: 8,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default TypeList;
