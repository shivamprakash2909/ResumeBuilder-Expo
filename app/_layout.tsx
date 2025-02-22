import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* <Stack.Screen
        name="AnimationScreen"
        options={{ headerShown: false }} // Hide header for the animation screen
      /> */}
      {/* <Stack.Screen name="Help" options={{ title: "Help" }} /> */}
      <Stack.Screen name="signup/index" options={{ title: "Sign Up" }} />
      <Stack.Screen name="login/index" />
      <Stack.Screen name="github-info/index" />
      <Stack.Screen
        name="repository-selection/index"
        options={{ title: "Repositories" }}
      />
      {/* <Stack.Screen name="MainInterface" /> */}
      {/* <Stack.Screen
        name="ProfileSettingsPage"
        options={{ title: "Profile Settings" }}
      /> */}
      {/* <Stack.Screen
        name="FinalResumePage"
        options={{ title: "Final Resume" }}
      /> */}
    </Stack>
  );
}
