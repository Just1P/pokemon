import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="pokemons" options={{ title: "Tous les Pokémon" }} />
      <Stack.Screen name="team" options={["Combat"]} />
    </Stack>
  );
};

export default Layout;
