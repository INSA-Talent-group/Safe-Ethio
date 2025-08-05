//app/login.tsx
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "@/components/atoms/Button";
import ImagePickerModal from "@/components/molecules/ImagePickerModal";
import Utils from "@/utils/utils";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
// import ImagePickerModal from "@/components/organisms/dropDown";

export default function RegisterScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setLoading(true);
    //validation logic
    for (const key in logInData) {
      if (!logInData[key as keyof typeof logInData]) {
        Alert.alert("Validation Error", `Please fill in the ${key} field.`);
        return;
      }
    }
    if (logInData.password !== logInData.confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }
    if (!image) {
      Alert.alert("Validation Error", "Please select an image.");
      return;
    }
    //check email format
    if (!Utils.isValidEmail(logInData.email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return;
    }
    //check phone number format
    if (!Utils.isValidPhoneNumber(logInData.phoneNumber)) {
      Alert.alert("Validation Error", "Please enter a valid phone number.");
      return;
    }

    // Here you would typically send the data to your backend

    // Simulate a successful registration
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      name: "fayda" + Date.now() + "." + Utils.getExtension(image),
      type: "image/*",
    } as any);
    formData.append("email", logInData.email);
    formData.append("password", logInData.password);
    formData.append("fullname", logInData.fullName);
    formData.append("username", logInData.fullName);

    formData.append("phone_number", logInData.phoneNumber);
    // api call to register user would go here
    axios
      .post("http://localhost:8000/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Registration successful:", response.data);
            Alert.alert(
      "Registration Successful",
      `Email: ${logInData.email}, Password: ${logInData.password}`
    );
        //redirect
    router.replace("/login");
      })
      .catch((error) => {
        console.error("Registration error:", error);
        Alert.alert(
          "Registration Error",
          "An error occurred during registration."
        );
      })
      .finally(() => {
        setLoading(false);
        //finally
      });




  };
  if(loading) {
    return (
      <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1, justifyContent: 'center' }} />
    )
  }

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
        {/* 
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Pressed!")}
        >
          <Text style={styles.buttonText}>Press me</Text>
        </TouchableOpacity> */}
        <TextInput
          style={styles.input}
          placeholder="phone number"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={logInData.phoneNumber}
          onChangeText={(text) =>
            setLogInData({ ...logInData, phoneNumber: text })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={logInData.email}
          onChangeText={(text) => setLogInData({ ...logInData, email: text })}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Fayda photo"
          value={logInData.faydaImage}
          onChangeText={(text) =>
            setLogInData({ ...logInData, faydaImage: text })
          }
        /> */}
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
        <View
          style={{
            marginTop: 5,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          {/* <ImagePickerModal image={image} setImage={setImage} /> */}
          <Button title="Pick Image" onPress={() => setIsModalVisible(true)} />
          <ImagePickerModal
            isVisible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            onImagePicked={setImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 60,
                borderRadius: 10,
                marginLeft: 10,
              }}
            />
          )}
        </View>

        <Button
          style={{ borderRadius: 20 }}
          title="Register"
          onPress={handleRegister}
        />
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
