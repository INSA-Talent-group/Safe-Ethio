//app/login.tsx
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
    //validation logic

    Alert.alert(
      "Login Successful",
      `Email: ${logInData.email}, Password: ${logInData.password}`
    );

    //redirect
    router.replace("/home");
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
