import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="details/[id]" options={{ title: "Pokemon" }} />
      <Stack.Screen name="search/[query]" options={{ title: "Recherche" }} />
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Tabs", headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
