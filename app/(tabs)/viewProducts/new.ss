import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)/addProducts"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(tabs)/viewProducts"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
