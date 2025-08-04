import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

export default class Utils {
  static getExtension(filePath: string): string {
    return filePath.split(".").pop() || "";
  }
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  // Adjust regex as per your phone number format requirements
  // This regex checks for a valid international phone number format
  // starting with an optional '+' followed by digits.
  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^\+[1-9]\d{14}$/; //like +251911234567
    //or if the country code is not needed, that start with 09 or 07
    //for Ethiopian phone numbers, you can use the following regex
    const phoneRegex1 = /^(09|07)\d{8}$/; //for 10 digit numbers starting with 09 or 07
    return phoneRegex.test(phone) || phoneRegex1.test(phone);
  }
  static requestLocationPermissions = async () => {
    // This function should return the current location of the user
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting location permissions:", error);
      return false;
    }
  };
  static async requestCameraPermissions() {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access camera was denied");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting camera permissions:", error);
      return false;
    }
  }
  static async requestMediaLibraryPermissions() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access media library was denied");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error requesting media library permissions:", error);
      return false;
    }
  }
  static async getCurrentLocation() {
    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        speed: location.coords.speed,
        accuracy: location.coords.accuracy,
        altitude: location.coords.altitude,
        altitudeAccuracy: location.coords.altitudeAccuracy,
        heading: location.coords.heading,
        timestamp: location.timestamp,
      };
    }
    console.error("Unable to retrieve location");
    return null;
  }
}
