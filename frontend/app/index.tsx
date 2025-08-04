import OnboardingScreen from "@/screens/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      const onboarded = await AsyncStorage.getItem("hasOnboarded");
      const loggedIn = await AsyncStorage.getItem("isLoggedIn");

      setIsOnboardingComplete(onboarded === "true");
      setIsLoggedIn(loggedIn === "true");
      setIsLoading(false);
    };

    checkStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!isOnboardingComplete) {
    return <OnboardingScreen />;
  }

  return (
    <>
      {/* If the user is logged in, you can render the main app or dashboard here */}
      <Redirect href={isLoggedIn ? "/(tabs)/home" : "/(auth)/login"} />
    </>
  );
}
