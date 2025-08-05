//app/login.tsx
import Utils from "@/utils/utils";
import axios from "axios";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

export default function LoginScreen() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    // validation logic
    if (!logInData.email || !logInData.password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    //check email format
    if (!Utils.isValidEmail(logInData.email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    // Api call logic
    console.log("Login Data:", logInData);
    axios.post("http://localhost:8000/LoginAPIView/", logInData)
            .then((response) => {
              //request permissions
              //request permissions
              Utils.requestLocationPermissions();
              Utils.requestCameraPermissions();
              Utils.requestMediaLibraryPermissions();
              console.log("Login successful:", response.data);
              Alert.alert("Login Successful", "Welcome back!");
              // Redirect to home or dashboard
              router.replace("/home");
            })
            .catch((error) => {
              console.error("Login error:", error);
              Alert.alert("Login Failed", "Please check the conection");
            })
            .finally(() => {
              // Optionally, you can reset the form or perform other actions
              setLogInData({ email: "", password: "" });
            })
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        {/* <Text style={styles.title}>Login To Safe Ethiopia</Text> */}

        {/* 
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Pressed!")}
        >
          <Text style={styles.buttonText}>Press me</Text>
        </TouchableOpacity> */}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={logInData.email}
          onChangeText={(text) => setLogInData({ ...logInData, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={logInData.password}
          onChangeText={(text) =>
            setLogInData({ ...logInData, password: text })
          }
        />

        <Button title="Login" onPress={handleLogin} />
        <Link href="/register" asChild style={{ marginTop: 20 }}>
          <Text style={{ color: "#6200ee" }}>
            Don&apos;t have an account? Register
          </Text>
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
    marginHorizontal: 10,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#6200ee",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
