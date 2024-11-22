import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Pokédev</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Header;
