import { StyleSheet, Text } from "react-native";

export default function Label({
  text,
  style,
}: {
  text: string;
  style?: object;
}) {
  return <Text style={[styles.label, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 5,
  },
});
