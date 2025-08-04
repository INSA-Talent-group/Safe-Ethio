import { Alert, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import Button from "../atoms/Button";
import * as ImagePicker from "expo-image-picker";
import TitleText from "../atoms/TitleText";

export default function ImagePickerModal({
  isVisible,
  onClose,
  onImagePicked,
}: {
  isVisible: boolean;
  onClose: () => void;
  onImagePicked: (uri: string) => void;
}) {
  const pickFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
    onClose();
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({ quality: 1 });
    if (!result.canceled) {
      onImagePicked(result.assets[0].uri);
    }
    onClose();
  };

  return (
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
          <TitleText>Select image</TitleText>
          <TouchableOpacity>
            <Button
              style={styles.button}
              title="Take Photo"
              onPress={takePhoto}
            />
          </TouchableOpacity>
          <Button
            style={styles.button}
            title="Choose from Gallery"
            onPress={pickFromLibrary}
          />
          <Button style={styles.button} title="Cancel" onPress={onClose} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "green",
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
    borderRadius: 10,
    textAlign: "center",
  },
});
