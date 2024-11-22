import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Les types" }} />
      <Stack.Screen
        name="byType/[type]"
        options={{ title: "Pokémon par Type" }}
      />
    </Stack>
  );
};

export default Layout;
