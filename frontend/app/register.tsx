//app/login.tsx
import { Link } from "expo-router";
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

export default function RegisterScreen() {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    faydaNumber: "",
  });

  const handleRegister = () => {
    //validation logic

    Alert.alert(
      "Registration Successful",
      `Email: ${logInData.email}, Password: ${logInData.password}`
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        {/* <Text style={styles.title}>Register To Safe Ethiopia</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          autoCapitalize="words"
          value={logInData.fullName}
          onChangeText={(text) =>
            setLogInData({ ...logInData, fullName: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Fayda number"
          value={logInData.faydaNumber}
          onChangeText={(text) =>
            setLogInData({ ...logInData, faydaNumber: text })
          }
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
          value={logInData.confirmPassword}
          onChangeText={(text) =>
            setLogInData({ ...logInData, confirmPassword: text })
          }
        />
        <Button title="Register" onPress={handleRegister} />
        <Link href="/login" asChild>
          <Text style={{ color: "#6200ee", marginTop: 20 }}>
            Already have an account? Login
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
