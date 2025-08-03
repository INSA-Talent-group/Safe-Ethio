import { StyleSheet, Text } from "react-native";

export default function TitleText({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: object;
}) {
  return <Text style={[style, styles.titleText]}>{children}</Text>;
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    lineHeight: 28,
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
});
