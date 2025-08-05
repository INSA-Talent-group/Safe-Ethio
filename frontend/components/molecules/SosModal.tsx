import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TitleText from "../atoms/TitleText";
import Button from "../atoms/Button";
import BodyText from "../atoms/BodyText";
import HiddenCamera from "./HiddenCamera";
import { useEffect, useState } from "react";
import Utils from "@/utils/utils";
import { ActivityIndicator, Checkbox } from "react-native-paper";
import axios from "axios";

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

export default function SosModal({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  const [shouldCameraCapture, setShouldCameraCapture] = useState(false);
  const [pictures, setPictures] = useState<{ front?: string; back?: string }>(
    {}
  );

  const [currentLocation, setCurrentLocation] = useState<LocationType>();
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchLocation() {
      const location = await Utils.getCurrentLocation();
      if (location) {
        setCurrentLocation(location);
      }
    }
    fetchLocation();
  }, []);

  const sendSos = () => {
    setIsLoading(true);
    //take one picture
    //send the picture and location to the server
    //send to server
    const sosData = {
      location: currentLocation,
      pictures: pictures,
    };

    axios
      .post("http://localhost:8000/alert/", sosData)
      .then((response) => {
        Alert.alert("SOS Sent", "Your SOS signal has been sent successfully.");
      })
      .catch((error) => {
        Alert.alert("SOS Error", "There was an error sending your SOS signal.");
      })
      .finally(() => {
        setIsLoading(false);
        onClose();
      });
  };

  if(isLoading) {
    return (
      <ActivityIndicator size="large" color="#d81f50ff" style={{ flex: 1,justifyContent:"center",alignItems:"center" }} />
    )
  }

  return (
    <>
      {isSelected && <HiddenCamera setPictures={setPictures} />}
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={onClose}
        transparent={true}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={onClose}
        >
          <View style={styles.modalContent}>
            <TitleText style={{}}>Attention</TitleText>
            <BodyText style={{ marginBottom: 20 }}>
              Are you sure you want to send an SOS signal? This will alert your
              emergency contacts and authorities. Please confirm your action.
            </BodyText>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={isSelected ? "checked" : "unchecked"}
                  onPress={() => setSelection(!isSelected)}
                />
                <Text style={{ fontSize: 18 }}>Image</Text>
              </View>
              <TouchableOpacity style={{ flex: 1 }}>
                <Button
                  style={styles.button}
                  title="Send SOS"
                  onPress={sendSos}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: "#d81f50ff",
    borderRadius: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
