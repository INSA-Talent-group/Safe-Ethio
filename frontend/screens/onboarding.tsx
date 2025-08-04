import OnBoardingSwiper from "@/components/organisms/OnboardingSwiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";

const slides = [
  {
    key: "1",
    title: "Welcome to Safe Ethiopia",
    text: "Your safety, our priority.",
    image: require("../assets/safe1.webp"),
  },
  {
    key: "2",
    title: "Stay Alert",
    text: "Get real-time emergency alerts.",
    image: require("../assets/safe2.webp"),
  },
  {
    key: "3",
    title: "Easy Access to Help",
    text: "One-tap SOS and assistance.",
    image: require("../assets/safe3.avif"),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  // console.log("onboarding screen rendered");

  const finishedOnboarding = async () => {
    // Logic to handle when the user finishes onboarding
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace("/(auth)/login"); // Redirect to login page after onboarding
  };

  return <OnBoardingSwiper slides={slides} onGetStarted={finishedOnboarding} />;
}
