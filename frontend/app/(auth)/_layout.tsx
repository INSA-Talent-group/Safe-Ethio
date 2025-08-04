import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{ title: "Login To Safe Ethiopia" }}
        />
        <Stack.Screen
          name="register"
          options={{ title: "Register To Safe Ethiopia" }}
        />
      </Stack>
    </>
  );
}
