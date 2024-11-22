import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Acceuil" }} />
      <Stack.Screen name="pokemons" options={{ headerShown: false }} />
    </Stack>
  );
}
