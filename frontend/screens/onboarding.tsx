import OnBoardingSwiper from "@/components/organisms/OnboardingSwiper";
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

  const handleGetStarted = () => {
    router.replace("/login"); // navigate to login page
  };

  return <OnBoardingSwiper slides={slides} onGetStarted={handleGetStarted} />;
}
