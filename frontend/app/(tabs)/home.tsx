import Utils from "@/utils/utils";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type LocationType = {
  latitude: number;
  longitude: number;
  speed?: number;
  accuracy?: number;
  altitude?: number;
  altitudeAccuracy?: number;
  heading?: number;
  timestamp: number;
};

export default function Index() {
  const [currentLocation, setCurrentLocation] = useState<LocationType>();

  useEffect(() => {
    async function fetchLocation() {
      const location = await Utils.getCurrentLocation();
      console.log("Current Location:", location);
      if (location) {
        setCurrentLocation(location);
      }
    }
    fetchLocation();
  }, []);
  console.log("Current Location:", currentLocation);
  return (
    <>
      <View>
        <Link href="/" style={{ padding: 20, fontSize: 18 }}>
          Go to Onboardingggg
        </Link>
        <Text>
          {currentLocation
            ? `Latitude: ${currentLocation.latitude}, Longitude: ${
                currentLocation.longitude
              }, Speed: ${currentLocation.speed}, Accuracy: ${
                currentLocation.accuracy
              }, Altitude: ${currentLocation.altitude}, Altitude Accuracy: ${
                currentLocation.altitudeAccuracy
              }, Heading: ${currentLocation.heading}, Timestamp: ${new Date(
                currentLocation.timestamp
              ).toLocaleString()}`
            : "Fetching location..."}
        </Text>
      </View>
    </>
  );
}
