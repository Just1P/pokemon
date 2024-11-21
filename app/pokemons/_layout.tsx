import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="details/[id]" options={{ title: "Pokemon" }} />
      <Stack.Screen name="search/[query]" options={{ title: "Recherche" }} />
    </Stack>
  );
};

export default Layout;
